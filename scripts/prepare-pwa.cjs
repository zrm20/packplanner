const fs = require('node:fs');
const crypto = require('node:crypto');
const prefix = process.env.EXPO_PUBLIC_BASE_URL || '';
if (prefix && !/^\/[a-zA-Z0-9/_-]+$/.test(prefix))
  throw new Error('EXPO_PUBLIC_BASE_URL must be an absolute path');
const base = `${prefix.replace(/\/+$/, '')}/`;
const html = fs.readFileSync('dist/index.html', 'utf8');
fs.writeFileSync(
  'dist/index.html',
  html
    .replace('<!-- hosting-base -->', `<base href="${base}">`)
    .replace(
      '<!-- production-service-worker -->',
      '<script src="pwa/register-sw.js" defer></script>'
    )
);
const version = crypto
  .createHash('sha256')
  .update(fs.readFileSync('dist/pwa/offline.html'))
  .update(fs.readFileSync('public/sw.js'))
  .digest('hex')
  .slice(0, 12);
fs.writeFileSync(
  'dist/sw.js',
  fs.readFileSync('public/sw.js', 'utf8').replace('%CACHE_VERSION%', version)
);
console.log(`PWA prepared for ${base}`);
