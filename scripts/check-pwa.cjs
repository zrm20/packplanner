// Run against an export, or PWA_DEV_URL for the Expo development server. Firebase Auth is mocked at its HTTP boundary.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const devURL = process.env.PWA_DEV_URL;
const base = devURL
  ? '/'
  : fs.readFileSync('dist/index.html', 'utf8').match(/<base href="([^"]+)"/)[1];
(async () => {
  const server = http.createServer((request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    if (!pathname.startsWith(base)) {
      response.writeHead(404).end();
      return;
    }
    const file = path.resolve(
      'dist',
      '.' + pathname.slice(base.length - 1),
      pathname.endsWith('/') ? 'index.html' : ''
    );
    if (!file.startsWith(path.resolve('dist') + path.sep)) {
      response.writeHead(404).end();
      return;
    }
    const type =
      {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.webmanifest': 'application/manifest+json',
        '.html': 'text/html',
        '.png': 'image/png',
      }[path.extname(file)] || 'text/plain';
    try {
      const content = fs.readFileSync(file);
      response.writeHead(200, { 'Content-Type': type });
      response.end(content);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = devURL || `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launchPersistentContext('', {
    ...(process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {}),
    args: ['--no-sandbox'],
  });
  try {
    const context = browser;
    context.on('page', (page) =>
      page.on('pageerror', (error) => console.error('Browser error:', error.message))
    );
    await context.route('https://identitytoolkit.googleapis.com/**', (route) =>
      route.fulfill({
        json: {
          idToken: [
            'header',
            JSON.stringify({
              sub: 'pwa-test-guest',
              user_id: 'pwa-test-guest',
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date.now() / 1000) + 3600,
              firebase: { sign_in_provider: 'anonymous' },
            }),
            'signature',
          ]
            .map((value) => Buffer.from(value).toString('base64url'))
            .join('.'),
          refreshToken: 'test-refresh',
          expiresIn: '3600',
          localId: 'pwa-test-guest',
          users: [{ localId: 'pwa-test-guest', providerUserInfo: [] }],
        },
      })
    );
    // No requests reach Firestore: writes remain unacknowledged for the interruption check.
    await context.route('https://firestore.googleapis.com/**', (route) => route.abort());
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(devURL ? 90000 : 15000);
    const manifest = await (
      await context.request.get(`${origin}${base}manifest.webmanifest`)
    ).json();
    assert.equal(manifest.name, 'Trail Pack Pro');
    assert.equal(manifest.display, 'standalone');
    assert.equal(
      new URL(manifest.start_url, `${origin}${base}manifest.webmanifest`).pathname,
      base
    );
    assert.equal(new URL(manifest.scope, `${origin}${base}manifest.webmanifest`).pathname, base);
    const { expo } = require('../app.json');
    assert.equal(manifest.theme_color, expo.web.themeColor);
    assert.equal(manifest.background_color, expo.web.backgroundColor);
    for (const icon of manifest.icons)
      assert.equal(
        (
          await context.request.get(new URL(icon.src, `${origin}${base}manifest.webmanifest`).href)
        ).status(),
        200
      );
    await page.goto(`${origin}${base}`);
    if (!devURL) await page.waitForFunction(() => navigator.serviceWorker.controller);
    else {
      assert.equal(
        await page.evaluate(async () => (await navigator.serviceWorker.getRegistrations()).length),
        0
      );
      assert.deepEqual(await page.evaluate(() => caches.keys()), []);
    }
    assert.equal(
      await page.locator('meta[name="viewport"]').getAttribute('content'),
      'width=device-width, initial-scale=1, viewport-fit=cover'
    );
    assert.equal(
      await page
        .locator('meta[name="apple-mobile-web-app-status-bar-style"]')
        .getAttribute('content'),
      'black-translucent'
    );
    assert.equal(
      await page.locator('link[rel="manifest"]').evaluate((el) => el.href),
      `${origin}${base}manifest.webmanifest`
    );
    assert.equal(
      (
        await context.request.get(
          await page.locator('link[rel="apple-touch-icon"]').evaluate((el) => el.href)
        )
      ).status(),
      200
    );
    const cdp = await context.newCDPSession(page);
    const installability = await cdp.send('Page.getAppManifest');
    assert.deepEqual(installability.errors, []);
    if (!devURL)
      assert.deepEqual((await cdp.send('Page.getInstallabilityErrors')).installabilityErrors, []);
    if (!devURL) {
      const registrations = await page.evaluate(async () =>
        (
          await navigator.serviceWorker.getRegistrations()
        ).map((r) => ({ scope: r.scope, script: r.active.scriptURL }))
      );
      assert.deepEqual(registrations, [
        { scope: `${origin}${base}`, script: `${origin}${base}sw.js` },
      ]);
    }
    assert.equal(await page.getByRole('dialog').count(), 0);
    // Existing browser-free back path.
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.getByRole('button', { name: 'Go Back', exact: true }).click();
    await page.getByRole('button', { name: 'Continue as Guest', exact: true }).click();
    // Real CSS environment variables drive the existing safe-area provider.
    // Check outside geometry across resizes, including changing top/bottom insets.
    for (const [width, height, top, bottom] of [
      [390, 844, 0, 0],
      [390, 844, 47, 34],
      [844, 390, 0, 21],
      [390, 500, 47, 34],
      [390, 844, 20, 10],
    ]) {
      await cdp.send('Emulation.setSafeAreaInsetsOverride', {
        insets: { top, bottom, left: 0, right: 0 },
      });
      await page.setViewportSize({ width, height });
      await page.waitForFunction(
        ({ height, bottom }) => {
          const tabs = [...document.querySelectorAll('a[role="tab"], a')].filter((el) =>
            /^(Locker|MyPack|Water|Categories|Settings)$/.test(
              el.textContent.replace(/[^a-zA-Z]/g, '')
            )
          );
          return (
            document.documentElement.scrollHeight === height &&
            tabs.length === 5 &&
            tabs.every((el) => el.getBoundingClientRect().bottom <= height - bottom + 1)
          );
        },
        { height, bottom }
      );
      const root = await page.locator('#root').boundingBox();
      assert.equal(root.y, 0);
      assert.equal(root.height, height);
      assert.equal(root.width, width);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      assert.equal(await page.evaluate(() => document.documentElement.scrollHeight), height);
      for (const name of ['Locker', 'MyPack', 'Water', 'Categories', 'Settings']) {
        const tab = page.getByRole('link', { name: new RegExp(name) });
        const box = await tab.boundingBox();
        assert(box.x >= 0 && box.y >= top && box.x + box.width <= width + 1);
        assert(box.y + box.height <= height - bottom + 1);
        for (const text of await tab.locator('[dir="auto"]').all()) {
          const bounds = await text.boundingBox();
          assert(
            bounds.y + bounds.height <= height - bottom + 1,
            `${name} icon/label must clear the home indicator`
          );
        }
        await tab.click();
      }
      const heading = await page.getByText('Settings', { exact: true }).first().boundingBox();
      assert(heading.y >= top, 'Settings heading must remain below the top safe area');
    }
    await cdp.send('Emulation.setSafeAreaInsetsOverride', {
      insets: { top: 0, bottom: 0, left: 0, right: 0 },
    });
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.getByRole('link', { name: /Locker/ }).click();
    await page.getByRole('button', { name: 'Add pack', exact: true }).click();
    await page.getByText('New Pack', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Close screen', exact: true }).click();
    await page.getByRole('button', { name: 'Add pack', exact: true }).waitFor();
    await page.getByRole('link', { name: /Settings/ }).click();
    await page.getByRole('button', { name: 'Install app', exact: true }).click();
    await page.getByRole('dialog', { name: 'Install Trail Pack Pro' }).waitFor();
    await page.getByText(/Use your browser’s Install app/).waitFor();
    assert.equal(await page.getByRole('button', { name: 'Install', exact: true }).count(), 0);
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    // Browser API boundary: a prompt may be used only after an explicit click.
    await page.evaluate(() => {
      window.promptCount = 0;
      const event = new Event('beforeinstallprompt', { cancelable: true });
      event.prompt = async () => {
        window.promptCount++;
      };
      event.userChoice = Promise.resolve({ outcome: 'dismissed' });
      window.dispatchEvent(event);
    });
    assert.equal(await page.evaluate(() => window.promptCount), 0);
    await page.getByRole('button', { name: 'Install app', exact: true }).click();
    await page.getByRole('button', { name: 'Install', exact: true }).click();
    assert.equal(await page.evaluate(() => window.promptCount), 1);
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    await context.setOffline(true);
    await page.getByRole('heading', { name: 'Internet connection required' }).waitFor();
    await page.getByRole('button', { name: 'Retry', exact: true }).click();
    await page.getByText('Still unable to connect.').waitFor();
    // A browser online event does not prove connectivity (for example a captive
    // portal returning HTML). Retry must keep the app blocked until the probe passes.
    await context.route('**/pwa/connection.txt?*', (route) =>
      route.fulfill({ body: '<html>Sign in to Wi-Fi</html>' })
    );
    await context.setOffline(false);
    await page.getByRole('button', { name: 'Retry', exact: true }).click();
    await page.getByText('Still unable to connect.').waitFor();
    assert.equal(await page.locator('#root').getAttribute('inert'), '');
    await context.unroute('**/pwa/connection.txt?*');
    await page.getByRole('button', { name: 'Retry', exact: true }).click();
    await page.waitForFunction(() => !document.querySelector('[data-connection-required]'));
    if (!devURL) {
      await context.setOffline(true);
      await page.reload();
      await page.getByRole('heading', { name: 'Internet connection required' }).waitFor();
      await page.getByRole('button', { name: 'Retry', exact: true }).click();
      await page.getByText('Still unable to connect.').waitFor();
      await context.setOffline(false);
      await page.getByRole('button', { name: 'Retry', exact: true }).click();
      await page.waitForFunction(() => !document.querySelector('[data-connection-required]'));
      assert.equal(new URL(page.url()).pathname, base);
    }
    // Exercise device-specific fallbacks through the actual Settings entry.
    for (const [agent, text] of [
      ['iPhone', /In Safari, open the Share menu/],
      ['Android', /In Chrome, open the menu/],
    ]) {
      await page.evaluate(
        (agent) =>
          Object.defineProperty(navigator, 'userAgent', { value: agent, configurable: true }),
        agent
      );
      await page.getByRole('link', { name: /Settings/ }).click();
      await page.getByRole('button', { name: 'Install app', exact: true }).click();
      await page.getByText(text).waitFor();
      await page.getByRole('button', { name: 'Close', exact: true }).click();
    }
    const caches = await page.evaluate(async () => {
      const entries = await Promise.all(
        (
          await window.caches.keys()
        ).map(async (key) =>
          (await (await window.caches.open(key)).keys()).map((request) => request.url)
        )
      );
      return entries.flat();
    });
    assert.deepEqual(caches, devURL ? [] : [`${origin}${base}pwa/offline.html`]);
    await page.getByRole('link', { name: /Locker/ }).click();
    await page.getByRole('button', { name: 'Add pack', exact: true }).click();
    await page.getByRole('textbox').nth(0).fill('Test brand');
    await page.getByRole('textbox').nth(1).fill('Pending pack');
    await page.getByRole('textbox').nth(2).fill('50');
    await page.getByRole('textbox').nth(3).fill('2');
    const writeStarted = page.waitForRequest((request) =>
      request.url().includes('Firestore/Write/channel')
    );
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await writeStarted;
    await context.setOffline(true);
    await page.getByRole('heading', { name: 'Internet connection required' }).waitFor();
    assert.equal(await page.getByRole('textbox').nth(1).inputValue(), 'Pending pack');
    assert.equal(
      await page
        .getByRole('button', { name: 'Save', exact: true, includeHidden: true })
        .isDisabled(),
      true
    );
    console.log(
      `PWA ${
        devURL ? 'development' : base
      }: metadata, install guidance, safe-area geometry, navigation, connection blocking, Retry, recovery and pending saves passed.`
    );
  } finally {
    await browser.close();
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
