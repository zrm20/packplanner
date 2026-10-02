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
