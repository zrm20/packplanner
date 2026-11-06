// Shared by the live app and embedded directly in the cached offline page.
window.trailPackCheckConnection = async (base) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(new URL(`pwa/connection.txt?t=${Date.now()}`, base), {
      cache: 'no-store',
      signal: controller.signal,
    });
    if (
      !navigator.onLine ||
      !response.ok ||
      (await response.text()).trim() !== 'trailpack-online'
    ) {
      throw new Error('Internet connection required');
    }
  } finally {
    clearTimeout(timeout);
  }
};
