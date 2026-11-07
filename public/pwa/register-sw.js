// Only production exports include this entry point. Development must not
// register a worker: stale production caches interfere with local debugging.
(() => {
  const base = new URL('../', document.currentScript.src);
  if ('serviceWorker' in navigator)
    navigator.serviceWorker
      .register(new URL('sw.js', base), { scope: base.pathname })
      .catch(() => {});
})();
