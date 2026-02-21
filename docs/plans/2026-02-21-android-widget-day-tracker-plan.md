# Quitfucker — Android Expo Widget Day Tracker Plan

## Goal
Build an Android Expo app with a homescreen widget that shows days since last reset and lets the user trigger a **Relax** reset (set day counter back to 0 by updating reset date to today). Also add a GitHub Action that builds an APK and uploads it as downloadable artifact.

## Product behavior (MVP)
- Counter is **date-based** (automatic):
  - Store `lastResetDate` (ISO date string).
  - Display `days = today - lastResetDate`.
- App screen:
  - Large day counter.
  - `Relax` button.
  - Optional small status text with last reset date.
- Widget:
  - Shows current day counter.
  - `Relax` action in widget triggers reset and refresh.
- Android only.

## Tech approach
- Expo (React Native) app as shell.
- Android widget implemented via native module + Expo config plugin.
- Shared storage for app + widget state (Android SharedPreferences).
- JS bridge methods:
  - `getLastResetDate()`
  - `setLastResetDateToday()`
  - `getCurrentDayCount()`
  - `refreshWidget()`

## Delivery plan
1. Scaffold Expo app + basic screen.
2. Add day-counter state service (JS date math + persistence bridge).
3. Add Android native widget provider and layout.
4. Add widget click handler for Relax.
5. Wire app button to reset + widget refresh.
6. Add tests for date math and reset behavior.
7. Add CI workflow to build APK and upload artifact.
8. Document setup, usage, and APK download steps.

## Planned Git history (target)
1. `chore: scaffold expo android app shell`
2. `feat: add date-based day counter domain logic`
3. `feat(android-widget): add homescreen widget provider and layout`
4. `feat: connect relax reset action app<->widget`
5. `test: add day-counter and reset behavior tests`
6. `ci: add github action to build and upload release apk`
7. `docs: add setup, widget usage, and apk download guide`

## Acceptance criteria
- App launches on Android and shows day counter.
- Pressing Relax in app resets counter immediately.
- Widget displays same counter as app.
- Pressing Relax in widget resets counter and updates widget.
- GitHub Action produces downloadable APK artifact.

## Notes
- Keep architecture minimal and extendable.
- Prefer reliable APK build over aggressive optimizations for first release.
