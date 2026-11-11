// Optional draft-art tool. Runtime consumes the PNGs; replacements need no generator.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    ...(process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {}),
  });
  try {
    const page = await browser.newPage({ deviceScaleFactor: 1 });
    const logo = fs.readFileSync(path.join(__dirname, '../assets/trailhead/logo.svg'), 'utf8');
    const outputs = [
      ['assets/trailhead/logo.png', 1024, 'transparent'],
      ['assets/trailhead/splash.png', 1024, '#F4EFE4'],
      ['assets/trailhead/icon.png', 1024, '#F4EFE4'],
      ['assets/trailhead/adaptive-icon.png', 1024, 'transparent'],
      ['assets/favicon.png', 48, '#F4EFE4'],
      ['public/pwa/icon-180.png', 180, '#F4EFE4'],
      ['public/pwa/icon-192.png', 192, '#F4EFE4'],
      ['public/pwa/icon-512.png', 512, '#F4EFE4'],
    ];
    for (const [file, size, background] of outputs) {
      await page.setViewportSize({ width: size, height: size });
      await page.setContent(
        `<style>html,body{margin:0;background:${background}}svg{display:block;width:100vw;height:100vh}</style>${logo}`
      );
      await page.screenshot({ path: path.join(__dirname, '..', file), omitBackground: true });
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
