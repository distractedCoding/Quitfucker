# Android widget implementation notes

## Bridge API

Native module name: `DayCounter`

Exposed methods:

- `getLastResetDate()`
- `setLastResetDateToday()`
- `getCurrentDayCount()`
- `refreshWidget()`

## Storage

SharedPreferences file: `quitfucker_day_counter`

Key: `lastResetDate`

## Widget behavior

- Provider: `expo.modules.daycounter.DayCounterWidgetProvider`
- Action intent: `expo.modules.daycounter.ACTION_RELAX`
- Pressing widget Relax button:
  1. stores today ISO date
  2. refreshes all widget instances

## Build flow

GitHub Actions workflow:

- Install deps (`npm ci`)
- `expo prebuild --platform android`
- `./gradlew assembleRelease`
- Upload `app-release.apk` artifact

## CI stability guardrails

- Keep `expo-modules-core` on `2.2.3` with Expo SDK 52 to avoid Gradle plugin mismatch (`com.android.application` + `com.android.library` collision).
- Keep Expo autolinking pointed at `./modules` (`app.json` → `expo.autolinking.nativeModulesDir`) so the local module is always discovered.
