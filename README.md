# Trail Pack Pro

Trail Pack Pro is an Expo/React Native app for maintaining a gear inventory and
planning backpacking loadouts.

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
