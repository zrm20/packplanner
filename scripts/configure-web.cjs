// Expo evaluates app.config.js for both development and export. Only color
// values come from configuration; launch metadata lives in the shared assets.
const fs = require('node:fs');
const path = require('node:path');

function write(file, contents) {
  if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== contents)
    fs.writeFileSync(file, contents);
}

module.exports = (web) => {
  const publicDir = path.resolve(__dirname, '../public');
  write(
    path.join(publicDir, 'manifest.webmanifest'),
    JSON.stringify(
      {
        ...require('../web/manifest.json'),
        theme_color: web.themeColor,
        background_color: web.backgroundColor,
      },
      null,
      2
    )
  );
  const theme = `html { background: ${web.backgroundColor}; }\n`;
  write(path.join(publicDir, 'pwa/theme.css'), theme);
  // Embed dependencies so the connection-required document is the ONLY cached
  // resource. No app bundles, separate stylesheets, icons, or user data are cached.
  const offline = fs
    .readFileSync(path.resolve(__dirname, '../web/offline.html'), 'utf8')
    .replace('%THEME_COLOR%', web.themeColor)
    .replace(
      '<!-- offline-assets -->',
      `<style>${theme}${fs.readFileSync(path.join(publicDir, 'pwa/app.css'), 'utf8')}</style>`
    )
    .replace(
      'src="icon-192.png"',
      `src="data:image/png;base64,${fs
        .readFileSync(path.join(publicDir, 'pwa/icon-192.png'))
        .toString('base64')}"`
    )
    .replace(
      '<!-- offline-connection -->',
      `<script>${fs.readFileSync(path.join(publicDir, 'pwa/connection.js'), 'utf8')}</script>`
    );
  write(path.join(publicDir, 'pwa/offline.html'), offline);
};
