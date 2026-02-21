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

- Install deps
- `expo prebuild --platform android`
- `./gradlew assembleRelease`
- Upload `app-release.apk` artifact
