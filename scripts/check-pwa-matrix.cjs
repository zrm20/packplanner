const { spawn } = require('node:child_process');

const env = { ...process.env, EXPO_NO_TELEMETRY: '1', CI: '1' };
function run(args, overrides = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      stdio: 'inherit',
      env: { ...env, ...overrides },
    });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${args.join(' ')} exited ${code}`))
    );
  });
}

(async () => {
  // Leave the Pages export in dist for the deployment workflow.
  for (const prefix of ['', '/packplanner']) {
    const overrides = { EXPO_PUBLIC_BASE_URL: prefix };
    await run(
      ['node_modules/expo/bin/cli', 'export', '--platform', 'web', '--max-workers', '2'],
      overrides
    );
    await run(['scripts/prepare-pwa.cjs'], overrides);
    await run(['scripts/check-pwa.cjs'], overrides);
  }
  const url = 'http://127.0.0.1:8082';
  const dev = spawn(
    process.execPath,
    ['node_modules/expo/bin/cli', 'start', '--web', '--port', '8082', '--max-workers', '2'],
    {
      stdio: 'inherit',
      env: { ...env, EXPO_PUBLIC_BASE_URL: '' },
      detached: true,
    }
  );
  try {
    const deadline = Date.now() + 90000;
    while (true) {
      try {
        if ((await fetch(url, { signal: AbortSignal.timeout(2000) })).ok) break;
      } catch {
        /* Metro is starting. */
      }
      if (dev.exitCode !== null || Date.now() > deadline)
        throw new Error('Expo dev server did not start');
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    await run(['scripts/check-pwa.cjs'], { PWA_DEV_URL: url, EXPO_PUBLIC_BASE_URL: '' });
  } finally {
    process.kill(-dev.pid, 'SIGTERM');
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
