# Quitfucker (Android)

A minimal Expo Android app + homescreen widget that tracks day count based on date since last reset.

## Features

- Date-based day counter (`today - lastResetDate`)
- App UI with large count and **Relax** reset button
- Android homescreen widget showing same count
- Widget **Relax** button resets in SharedPreferences and refreshes widget
- GitHub Action builds release APK and uploads it as artifact

## Project structure

- `App.tsx` — app UI and Relax action wiring
- `src/domain/dayCounter.ts` — pure date/day-count logic
- `src/native/dayCounterModule.ts` — JS bridge to native module
- `modules/day-counter/android/...` — native Android module + widget
- `.github/workflows/android-apk.yml` — APK artifact CI

## Local run

```bash
npm install
npx expo run:android
```

## Widget usage

1. Install app on Android.
2. Long-press home screen → Widgets.
3. Add **Quitfucker** widget.
4. Press **Relax** in app or widget to reset day count to `0`.

The app and widget share state in Android `SharedPreferences` (`quitfucker_day_counter`).

## CI APK artifact download

1. Open GitHub repository Actions tab.
2. Run **Android APK** workflow (or push to `master`).
3. Open completed run.
4. Download artifact: `quitfucker-release-apk`.
5. Install `app-release.apk` from artifact bundle on Android device.

## Notes

- Android-only MVP by design.
- Native files are included as a local Expo module (`modules/day-counter`).
- Expo autolinking is configured via `app.json` (`expo.autolinking.nativeModulesDir = ./modules`) so the local module is discovered reliably in CI.
- `expo-modules-core` is pinned to `2.2.3` (the Expo SDK 52-compatible version) to avoid Gradle plugin incompatibilities during APK builds.
