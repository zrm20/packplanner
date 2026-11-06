// Run after a /packplanner production export. Firebase Auth is mocked at its HTTP boundary.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const server = http.createServer((request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    if (!pathname.startsWith('/packplanner/')) {
      response.writeHead(404).end();
      return;
    }
    const file = path.resolve(
      'dist',
      '.' + pathname.slice('/packplanner'.length),
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
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({
    ...(process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {}),
    args: ['--no-sandbox'],
  });
  try {
    const context = await browser.newContext();
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
    page.setDefaultNavigationTimeout(15000);
    const manifest = await (
      await context.request.get(`${origin}/packplanner/manifest.webmanifest`)
    ).json();
    assert.equal(manifest.name, 'Trail Pack Pro');
    assert.equal(manifest.display, 'standalone');
    assert.equal(manifest.start_url, '/packplanner/');
    for (const icon of manifest.icons)
      assert.equal((await context.request.get(origin + icon.src)).status(), 200);
    await page.goto(`${origin}${manifest.start_url}`);
    await page.waitForFunction(() => navigator.serviceWorker.controller);
    assert.equal(await page.getByRole('dialog').count(), 0);
    // Existing browser-free back path.
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.getByRole('button', { name: 'Go Back', exact: true }).click();
    await page.getByRole('button', { name: 'Continue as Guest', exact: true }).click();
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
    await context.setOffline(false);
    await page.waitForFunction(() => !document.querySelector('[data-connection-required]'));
    await context.setOffline(true);
    await page.reload();
    await page.getByRole('heading', { name: 'Internet connection required' }).waitFor();
    await page.getByRole('button', { name: 'Retry', exact: true }).click();
    await page.getByText('Still unable to connect.').waitFor();
    await context.setOffline(false);
    await page.getByRole('button', { name: 'Retry', exact: true }).click();
    await page.waitForFunction(() => !document.querySelector('[data-connection-required]'));
    assert.equal(new URL(page.url()).pathname, '/packplanner/');
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
    assert.deepEqual(caches, [`${origin}/packplanner/pwa/offline.html`]);
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
      'PWA export: install guidance, user-initiated prompt, navigation, offline launch, Retry and recovery passed.'
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
