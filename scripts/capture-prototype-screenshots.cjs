/**
 * DISPOSABLE (#32): Playwright capture + assertions for populated prototype Locker.
 * Extends check-pwa.cjs conventions (Chromium, Identity Toolkit stub, Firestore abort,
 * viewport/safe-area). Requires a prototype export (EXPO_PUBLIC_PROTOTYPE=1) or PWA_DEV_URL.
 *
 * Usage:
 *   yarn prototype:build && yarn prototype:screenshots
 *   PWA_DEV_URL=http://127.0.0.1:8081 yarn prototype:screenshots
 *
 * Naming / viewports: src/prototype/VIEWPORTS.md
 */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const VIEWPORTS = {
  primary: { name: 'primary', width: 390, height: 844 },
  narrow: { name: 'narrow', width: 360, height: 640 },
};

const DIRECTION = process.env.PROTOTYPE_DIRECTION || 'baseline';
const ARTIFACT_ROOT = path.resolve(
  'artifacts/prototype-screenshots',
  DIRECTION
);

const LOCKER_EXPECTED = {
  packBrands: ['Osprey', 'Gossamer Gear', 'ULA'],
  itemNames: ['Jacket', '1L Bottle', 'Copper Spur HV UL2'],
  longNameFragment: 'Extra Long Descriptive Name',
};

const devURL = process.env.PWA_DEV_URL;
const distIndex = path.resolve('dist/index.html');

function resolveBase() {
  if (devURL) return '/';
  if (!fs.existsSync(distIndex)) {
    throw new Error(
      'dist/index.html missing. Run `yarn prototype:build` or set PWA_DEV_URL to a prototype web server.'
    );
  }
  const match = fs.readFileSync(distIndex, 'utf8').match(/<base href="([^"]+)"/);
  return match ? match[1] : '/';
}

function screenshotPath(viewportName, view, state) {
  const dir = path.join(ARTIFACT_ROOT, viewportName);
  fs.mkdirSync(dir, { recursive: true });
  const suffix = state ? `--${state}` : '';
  return path.join(dir, `${view}${suffix}.png`);
}

async function assertNoFirestoreTraffic(firestoreHits) {
  assert.equal(
    firestoreHits.length,
    0,
    `Prototype must not reach Firestore; saw: ${firestoreHits.join(', ')}`
  );
}

async function waitForLocker(page) {
  await page.getByText('My Packs', { exact: true }).waitFor({ timeout: 60000 });
  await page.getByText('Inventory', { exact: true }).first().waitFor();
  for (const brand of LOCKER_EXPECTED.packBrands) {
    await page.getByText(brand, { exact: true }).first().waitFor();
  }
  for (const name of LOCKER_EXPECTED.itemNames) {
    await page.getByText(name, { exact: false }).first().waitFor();
  }
  await page.getByText(LOCKER_EXPECTED.longNameFragment, { exact: false }).first().waitFor();
}

async function assertTabsAvailable(page) {
  for (const name of ['Locker', 'MyPack', 'Water', 'Categories', 'Settings']) {
    const tab = page.getByRole('link', { name: new RegExp(name) });
    assert.equal(await tab.count(), 1, `Missing tab: ${name}`);
  }
}

async function assertLockerGeometry(page, viewport, topInset, bottomInset) {
  const root = await page.locator('#root').boundingBox();
  assert.ok(root, '#root missing');
  assert.equal(root.y, 0);
  assert.equal(root.height, viewport.height);
  assert.equal(root.width, viewport.width);

  for (const name of ['Locker', 'MyPack', 'Water', 'Categories', 'Settings']) {
    const tab = page.getByRole('link', { name: new RegExp(name) });
    const box = await tab.boundingBox();
    assert.ok(box, `${name} tab not laid out`);
    assert(
      box.y + box.height <= viewport.height - bottomInset + 1,
      `${name} tab must clear bottom inset`
    );
    assert(box.y >= topInset - 1, `${name} tab must clear top inset`);
  }

  const heading = await page.getByText('My Packs', { exact: true }).boundingBox();
  assert.ok(heading, 'My Packs heading missing');
  assert(heading.y >= topInset - 1, 'My Packs heading must clear top safe area');
}

(async () => {
  const base = resolveBase();
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

  const firestoreHits = [];
  const inspection = {
    direction: DIRECTION,
    viewports: VIEWPORTS,
    checks: [],
  };

  try {
    const context = browser;
    context.on('page', (page) =>
      page.on('pageerror', (error) => console.error('Browser error:', error.message))
    );

    // Defense-in-depth: same HTTP stubs as check-pwa.cjs (prototype skips auth, but prove isolation).
    await context.route('https://identitytoolkit.googleapis.com/**', (route) =>
      route.fulfill({
        json: {
          idToken: [
            'header',
            JSON.stringify({
              sub: 'prototype-guest',
              user_id: 'prototype-guest',
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
          localId: 'prototype-guest',
          users: [{ localId: 'prototype-guest', providerUserInfo: [] }],
        },
      })
    );
    await context.route('https://firestore.googleapis.com/**', (route) => {
      firestoreHits.push(route.request().url());
      return route.abort();
    });

    const page = await context.newPage();
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(devURL ? 120000 : 60000);

    const cdp = await context.newCDPSession(page);

    for (const viewport of [VIEWPORTS.primary, VIEWPORTS.narrow]) {
      firestoreHits.length = 0;
      await cdp.send('Emulation.setSafeAreaInsetsOverride', {
        insets: { top: 0, bottom: 0, left: 0, right: 0 },
      });
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      const url = `${origin}${base}?direction=${DIRECTION}&view=locker`;
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      // Keep connection gate from blanking captures (online + probe allowed).
      await page.waitForFunction(() => !document.querySelector('[data-connection-required]'), null, {
        timeout: 60000,
      }).catch(() => {});

      await waitForLocker(page);
      await assertTabsAvailable(page);
      await assertLockerGeometry(page, viewport, 0, 0);
      await assertNoFirestoreTraffic(firestoreHits);

      const out = screenshotPath(viewport.name, 'locker');
      await page.screenshot({ path: out, fullPage: false });
      inspection.checks.push({
        viewport: viewport.name,
        file: path.relative(process.cwd(), out),
        populatedLocker: true,
        tabsAvailable: true,
        firestoreRequests: 0,
        geometry: 'root fills viewport; tabs clear bottom; My Packs clears top',
      });
      console.log(`Captured ${out}`);
    }

    // Safe-area inspection pass at primary size (documented for visual review).
    firestoreHits.length = 0;
    await page.setViewportSize({
      width: VIEWPORTS.primary.width,
      height: VIEWPORTS.primary.height,
    });
    await cdp.send('Emulation.setSafeAreaInsetsOverride', {
      insets: { top: 47, bottom: 34, left: 0, right: 0 },
    });
    await page.goto(`${origin}${base}?direction=${DIRECTION}&view=locker`, {
      waitUntil: 'domcontentloaded',
    });
    await waitForLocker(page);
    await assertLockerGeometry(page, VIEWPORTS.primary, 47, 34);
    await assertNoFirestoreTraffic(firestoreHits);
    const safeOut = screenshotPath('primary', 'locker', 'safe-area');
    await page.screenshot({ path: safeOut, fullPage: false });
    inspection.checks.push({
      viewport: 'primary',
      file: path.relative(process.cwd(), safeOut),
      safeAreaInsets: { top: 47, bottom: 34 },
      note: 'Insets applied for clipping / clearance visual inspection',
    });
    console.log(`Captured ${safeOut}`);

    // Scroll inventory to confirm long list is reachable.
    await page.evaluate(() => {
      const lists = [...document.querySelectorAll('[data-testid], div')].filter(() => true);
      // Best-effort: scroll the tallest scrollable node inside #root.
      const root = document.querySelector('#root');
      const scrollables = root
        ? [...root.querySelectorAll('*')].filter((el) => el.scrollHeight > el.clientHeight + 8)
        : [];
      const target = scrollables.sort((a, b) => b.scrollHeight - a.scrollHeight)[0];
      if (target) target.scrollTop = target.scrollHeight;
    });
    inspection.checks.push({
      scrolling: 'Attempted inventory list scroll to end for long-name accessibility',
    });

    const reportPath = path.join(ARTIFACT_ROOT, 'inspection-report.json');
    fs.mkdirSync(ARTIFACT_ROOT, { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(inspection, null, 2));
    console.log(
      `Prototype screenshots (${DIRECTION}): populated Locker at primary+narrow; Firestore isolation OK; report ${path.relative(
        process.cwd(),
        reportPath
      )}`
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
