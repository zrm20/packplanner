# Trail Pack Pro

Trail Pack Pro is an Expo/React Native app for maintaining a gear inventory and
planning backpacking loadouts.

## Run in a browser

```sh
yarn install --frozen-lockfile
yarn web
```

Create a production build for GitHub Pages:

```sh
EXPO_PUBLIC_BASE_URL=/packplanner yarn build:web
```

The static site is written to `dist/`. The base URL sets the prefix for scripts,
images, and fonts. Omit it when hosting at the root of a domain. Local development
with `yarn web` uses the domain root by default.

Navigation stays within the app; individual screens do not have separate URLs.
Browser settings and the current pack persist locally, while accounts and saved
gear data continue to use the existing Firebase project.

## Deploy to GitHub Pages

The **Deploy web app to GitHub Pages** workflow checks types, runs tests, and
exports and deploys the web app on pushes to `main`. It can also be started
manually. It uses GitHub's token and does not require an Expo account or token.

One-time setup:

1. Confirm that the repository's visibility and GitHub plan support Pages.
2. In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. In Firebase Console, select `trailpackpro`, open **Authentication → Settings →
   Authorized domains**, and add `zrm20.github.io` if it is missing. Enter the
   hostname only. Check that the existing Email/Password and Anonymous sign-in
   providers remain enabled.
4. Merge the deployment changes into `main`. Watch the workflow in **Actions**,
   then open <https://zrm20.github.io/packplanner/>.
5. Check guest access, account login, registration, inventory and pack changes,
   charts, deletion confirmations, logout, and persistence after a refresh on
   desktop and mobile browsers. Use disposable data for destructive checks.

The workflow sets the base URL from the repository name. If adding a custom
domain, update that value to match the hosting path and authorize the new hostname
in Firebase. GitHub Pages serves only the frontend; Firebase usage remains
separate. Deploying a previous commit can roll back the frontend without changing
Firebase data.

The former EAS staging workflows and update configuration have been removed.
The unused repository `EXPO_TOKEN` secret can be deleted. Local iOS development
is still supported using the instructions below.

## Current development setup

- Expo SDK 57
- React Native 0.86
- React 19
- Node.js 22 or newer
- Xcode 26 with an installed iOS simulator runtime
- CocoaPods 1.17 or newer

## Run on an iOS simulator

Install JavaScript dependencies:

```sh
yarn install
```

Generate the ignored native iOS project and install its pods:

```sh
npx expo prebuild --platform ios
cd ios && pod install && cd ..
```

Build and launch the app:

```sh
yarn ios
```

For subsequent launches, `yarn start` is usually enough when the native
dependencies have not changed.

## Verification

```sh
npx tsc --noEmit
yarn test --watchAll=false --runInBand
npx expo-doctor
```

`patch-package` applies a temporary Expo Modules JSI compatibility fix during
`yarn install`. It can be removed once the corresponding Xcode 26.3 fix ships
in Expo.

## Installing on a personal iPhone

Open `ios/TrailPackPro.xcworkspace` in Xcode, select a personal development
team under Signing & Capabilities, connect the phone, and run the app on that
device. A free Apple ID works for personal development installs, though the
signature expires periodically; a paid Apple Developer membership avoids that
short renewal window and also enables TestFlight.

## Install the web app

On iPhone, open the deployed app in Safari. In Settings, choose **Install app**
for Share → Add to Home Screen guidance. On Android, use Chrome and the same
Settings entry. An Install button appears only when the browser supplies an
installation prompt; it never opens automatically. Installed launches use the
Trail Pack Pro name and logo in standalone mode.

The web app requires internet access. The browser's offline event blocks interaction
and shows Retry immediately. A connection probe also runs every 15 seconds while
visible, with an 8-second timeout, to detect Wi-Fi without internet access.
Retry verifies an uncached request before restoring the app;
pending writes are not reported as saved. The service worker caches only a
branded connection-required page, with no gear, packs, or app bundles. This
fallback becomes available after the service worker finishes its first online
installation. Existing React Navigation tabs, modal close buttons, and form
back/cancel actions remain available in standalone mode.

The source-controlled `public/index.html` is Expo's shared web document for both
`yarn web` and static exports. It exposes `viewport-fit=cover` before React starts
and uses the iOS `black-translucent` status bar. The app background shows behind
the status bar; the existing safe-area provider and tab navigator inset content
and tab controls. `public/pwa/app.css` supplies the shared viewport reset.

Stable install metadata lives in `web/manifest.json`; the connection-required
page lives in `web/offline.html`. Expo configuration resolves their shared public
assets in development and export, using the existing `app.json` web theme and
background colors. The offline document embeds its dependencies so it remains
the only cached resource. `public/sw.js` and `public/pwa/register-sw.js` contain
the production worker and its entry point.

Post-export preparation only sets the hosting base, includes the production
worker entry point, and versions the fallback cache. Set `EXPO_PUBLIC_BASE_URL`
to `/packplanner` for Pages or leave it empty for root hosting. Manifest resource
URLs are relative to the manifest; runtime probes and worker registration use
their script URL to resolve the app base. Serve production over HTTPS (or localhost).

Development deliberately does **not** include the worker registration entry point
or populate offline caches: a stale production worker can interfere with hot
reload and local debugging. Use a separate origin/port for production previews;
if one previously ran on the development origin, unregister it in browser
DevTools and clear its site data before testing development.

To run the same browser checks against root and `/packplanner/` exports and the
Expo development server (the final `dist/` is the Pages export):

```sh
npx playwright install chromium
yarn test:pwa:all
# Or use an existing compatible Chromium:
CHROME_BIN=/usr/bin/chromium yarn test:pwa:all
```

To check a single existing export, use `yarn test:pwa`. To check a running Expo
server, use `PWA_DEV_URL=http://127.0.0.1:8081 yarn test:pwa`.

The browser check stubs Firebase authentication and blocks all Firestore traffic;
test saves never reach the backend. It covers installation guidance, explicit
prompt timing, authenticated form close/back navigation, prefix assets,
disconnection during a pending save, offline launch, failed Retry, and recovery.
It also checks shared launch metadata, manifest/icon resolution, worker scope,
no development registration/caches, and viewport geometry across portrait,
landscape, short-height, and changing simulated top/bottom safe-area insets.
The Pages workflow runs the complete matrix before deployment. It does not replace these
installed-device acceptance checks:

- iPhone Safari or iOS Simulator: **remove the previous Home Screen installation
  and re-add the deployed app** so cached installation metadata cannot mask
  changes. Verify name/logo and standalone launch, background behind the
  translucent status bar, readable top headings/controls below the safe area,
  and all five tab icons/labels above the home indicator. Rotate and resize,
  navigate every tab, and exercise form inputs and close/back/cancel actions.
- Android Chrome: install, verify name/logo and supported branded splash,
  standalone launch, system-bar spacing, and in-app back/cancel actions.
- On both: launch in airplane mode after an online visit, try Retry while still
  offline, reconnect and Retry; disconnect during a save and verify no success
  is shown before the write is acknowledged.

Real iPhone and Android installation must be verified on those devices after
deployment; Chromium automation checks browser behavior and simulated insets,
not installed-device system UI.
