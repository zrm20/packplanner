const fs = require('node:fs');
const crypto = require('node:crypto');
const prefix = process.env.EXPO_PUBLIC_BASE_URL || '';
if (prefix && !/^\/[a-zA-Z0-9/_-]+$/.test(prefix))
  throw new Error('EXPO_PUBLIC_BASE_URL must be an absolute path');
const base = `${prefix.replace(/\/+$/, '')}/`;
const manifest = {
  id: base,
  name: 'Trail Pack Pro',
  short_name: 'Trail Pack Pro',
  start_url: base,
  scope: base,
  display: 'standalone',
  background_color: '#f6f7f8',
  theme_color: '#f6f7f8',
  icons: [192, 512].map((size) => ({
    src: `${base}pwa/icon-${size}.png`,
    sizes: `${size}x${size}`,
    type: 'image/png',
    purpose: 'any',
  })),
};
fs.writeFileSync('dist/manifest.webmanifest', JSON.stringify(manifest, null, 2));
const head = `<link rel="manifest" href="${base}manifest.webmanifest">
<link rel="apple-touch-icon" sizes="180x180" href="${base}pwa/icon-180.png">
<meta name="theme-color" content="#f6f7f8">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Trail Pack Pro">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="stylesheet" href="${base}pwa/app.css">
<script src="${base}pwa/connection.js" defer></script>
<script src="${base}pwa/runtime.js" defer></script>`;
let html = fs.readFileSync('dist/index.html', 'utf8');
// Expose the real device insets to SafeAreaProvider and the bottom tab navigator.
// The opaque document background and bounded root prevent content scrolling
// behind Safari's status-bar glass.
html = html.replace(
  /<meta name="viewport"[^>]*>/,
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
);
fs.writeFileSync('dist/index.html', html.replace('</head>', `${head}</head>`));
// A self-contained fallback is the only cached document: never cache app data or app bundles.
const offline = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Trail Pack Pro</title><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=contain"><meta name="theme-color" content="#f6f7f8"><style>${fs.readFileSync(
  'public/pwa/app.css',
  'utf8'
)}</style></head><body><section data-connection-required><img alt="" width="96" height="96" src="data:image/png;base64,${fs
  .readFileSync('public/pwa/icon-192.png')
  .toString(
    'base64'
  )}"><h1>Internet connection required</h1><p>Connect to the internet to use Trail Pack Pro.</p><p role="status"></p><button>Retry</button></section><script>
${fs.readFileSync('public/pwa/connection.js', 'utf8')}
const button = document.querySelector('button');
button.onclick = async () => {
  button.disabled = true;
  try {
    await window.trailPackCheckConnection(new URL('${base}', location.origin));
    location.replace('${base}');
  } catch { document.querySelector('[role="status"]').textContent = 'Still unable to connect.'; }
  finally { button.disabled = false; }
};
</script></body></html>`;
fs.writeFileSync('dist/pwa/offline.html', offline);
const version = crypto.createHash('sha256').update(offline).digest('hex').slice(0, 12);
fs.writeFileSync(
  'dist/sw.js',
  `
const CACHE = 'trailpack-connection-${version}';
const OFFLINE = new URL('pwa/offline.html', self.registration.scope).href;
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.add(OFFLINE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('trailpack-connection-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate' || !event.request.url.startsWith(self.registration.scope)) return;
  event.respondWith(fetch(event.request).catch(() => caches.open(CACHE).then(cache => cache.match(OFFLINE))));
});
`
);
console.log(`PWA prepared for ${base}`);
