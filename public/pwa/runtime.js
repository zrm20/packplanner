(() => {
  const base = new URL('../', document.currentScript.src);
  let installPrompt;
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
  });
  const installed = () =>
    window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  window.addEventListener('appinstalled', () => {
    installPrompt = undefined;
  });

  window.addEventListener('trailpack:install', () => {
    if (document.querySelector('#install-app')) return;
    const dialog = document.createElement('dialog');
    dialog.id = 'install-app';
    dialog.setAttribute('aria-labelledby', 'install-title');
    const title = document.createElement('h2');
    title.id = 'install-title';
    title.textContent = 'Install Trail Pack Pro';
    const guidance = document.createElement('p');
    const ios =
      /iPhone|iPad|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    guidance.textContent = installed()
      ? 'Trail Pack Pro is already running as an installed app.'
      : ios
      ? 'In Safari, open the Share menu, choose Add to Home Screen, then Add. If you are using another browser, open this page in Safari first.'
      : /Android/.test(navigator.userAgent)
      ? 'In Chrome, open the menu (⋮), then choose Install app or Add to Home screen. If this option is unavailable, open this page in Chrome.'
      : 'Use your browser’s Install app or Add to Home screen option when available. On iPhone use Safari’s Share menu; on Android use Chrome’s menu.';
    dialog.append(title, guidance);
    if (installPrompt && !installed()) {
      const button = document.createElement('button');
      button.textContent = 'Install';
      button.onclick = async () => {
        const prompt = installPrompt;
        installPrompt = undefined;
        button.remove();
        try {
          await prompt.prompt();
          await prompt.userChoice;
        } catch {
          /* Guidance remains available. */
        }
      };
      dialog.append(button);
    }
    const close = document.createElement('button');
    close.textContent = 'Close';
    close.onclick = () => dialog.close();
    dialog.append(close);
    dialog.addEventListener('close', () => dialog.remove());
    document.body.append(dialog);
    dialog.showModal();
  });

  let checking = false;
  function showConnectionRequired() {
    if (document.querySelector('[data-connection-required]')) return;
    document.querySelector('#install-app')?.close();
    const overlay = document.createElement('section');
    overlay.dataset.connectionRequired = '';
    overlay.setAttribute('role', 'alertdialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'connection-title');
    overlay.innerHTML = `<img src="${new URL(
      'pwa/icon-192.png',
      base
    )}" alt="" width="96" height="96"><h1 id="connection-title">Internet connection required</h1><p>Connect to the internet to use Trail Pack Pro.</p><p>Any pending changes are not confirmed saved.</p><p role="status"></p><button type="button">Retry</button>`;
    document.getElementById('root')?.setAttribute('inert', '');
    document.body.append(overlay);
    overlay.querySelector('button').onclick = verifyConnection;
    overlay.querySelector('button').focus();
  }
  async function verifyConnection() {
    if (checking) return;
    checking = true;
    const overlay = document.querySelector('[data-connection-required]');
    const button = overlay?.querySelector('button');
    if (button) button.disabled = true;
    try {
      await window.trailPackCheckConnection(base);
      document.querySelector('[data-connection-required]')?.remove();
      document.getElementById('root')?.removeAttribute('inert');
    } catch {
      showConnectionRequired();
      document.querySelector('[data-connection-required] [role="status"]').textContent =
        'Still unable to connect.';
    } finally {
      checking = false;
      if (button) button.disabled = false;
    }
  }
  // Browser online status can stay true when Wi-Fi has no internet access.
  setInterval(() => {
    if (!document.hidden) verifyConnection();
  }, 15000);
  window.addEventListener('offline', showConnectionRequired);
  window.addEventListener('online', verifyConnection);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) verifyConnection();
  });
  const start = () => {
    if (!navigator.onLine) showConnectionRequired();
    else verifyConnection();
    if ('serviceWorker' in navigator)
      navigator.serviceWorker
        .register(new URL('sw.js', base), { scope: base.pathname })
        .catch(() => {});
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
