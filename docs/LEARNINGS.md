# Learnings

## 2026-02-21 — APK build + widget integration incident learnings

### 1) Expo dependency alignment must be strict
- `expo-doctor` must be green before shipping APK pipelines.
- Mismatched Expo package versions can look like runtime crashes or random build instability.

### 2) Android emulator smoke tests are often CI-flaky by default
- Typical failure: `adb: device offline` on GitHub runners.
- Stability improvements that helped:
  - `disable-linux-hw-accel: true`
  - longer boot timeout
  - explicit `adb start-server`, `adb wait-for-device`, `adb reconnect offline`
  - conservative emulator flags (`-no-window -no-snapshot -noaudio -no-boot-anim -gpu swiftshader_indirect`)

### 3) GitHub Action script shell compatibility matters
- In emulator runner scripts, `/usr/bin/sh` is used; avoid bash-only options like `set -o pipefail`.
- Use POSIX-compatible script lines (`set -eu`) and avoid assumptions about shell behavior.

### 4) Avoid transient shell vars in runner-executed line-by-line scripts
- `APK_PATH=...` did not persist as expected in the runner command flow.
- Use literal paths directly in commands when reliability matters.

### 5) Local Expo native modules must be wired as proper Android library modules
- Missing/incorrect local module gradle config can cause:
  - `com.android.library` + `com.android.application` plugin collision in `:app`
- Fix required: explicit `modules/day-counter/android/build.gradle` with correct plugin/module setup.

### 6) Expo release builds may require additional packages beyond app code usage
- Missing `expo-asset` broke release bundling.
- For local native modules, explicit linkage to `expo-modules-core` is required to resolve Kotlin module imports.

### 7) Keep React Native patch aligned with Expo SDK
- Patch skew can trigger Kotlin/Compose compatibility failures in CI.
- Align RN patch level with Expo SDK expectations before debugging downstream symptoms.

### 8) Date-based counters need refresh triggers, not only initial load
- After reset (`Relax`), day count appeared stuck because state was loaded only at startup.
- Fix pattern:
  - reload on app foreground (`AppState: active`)
  - periodic refresh while app is open (e.g., every minute)

### 9) Process learning
- In this incident, failures were a chain, not one bug.
- Most efficient approach was: isolate one root cause at a time, patch minimally, rerun CI, and document each fix.
