# KBC — Android app

Wraps the `webapp/` folder in a Capacitor-based native Android shell, so it
installs as a real app icon. Like the GitHub Pages deployment, it syncs
scores/saved games to the same Cloudflare Worker (see
`../cloudflare-worker/README.md`) when online, so progress is shared with
the web version instead of being stuck on one device. Data still falls back
to the device's local storage when offline, and the game is fully playable
without a network connection either way.

## Getting the APK (no Android Studio needed)

A GitHub Actions workflow (`.github/workflows/build-android-apk.yml`)
builds the debug APK on every push to `master` that touches `webapp/` or
`android-app/`, and on manual trigger. To get it:

1. Go to the repo's **Actions** tab → **Build Android APK** → pick the
   latest successful run
2. Download the `kbc-debug-apk` artifact (a zip containing `app-debug.apk`)
3. Copy `app-debug.apk` to your phone and open it to install — Android
   will prompt you to allow installs from that source (Settings →
   Security → "Install unknown apps") since it isn't from the Play Store

## Building locally instead

Requires Node.js, JDK 17, and the Android SDK (e.g. via Android Studio).

```bash
cd android-app
npm install
npx cap sync android
cd android
./gradlew assembleDebug
```

The APK is written to `android/app/build/outputs/apk/debug/app-debug.apk`.

## Updating the app after changing webapp/

The Android project embeds a copy of `webapp/`'s files at build time — it
doesn't fetch them live. After editing `webapp/`, re-run `npx cap sync
android` (done automatically by the CI workflow) and rebuild before the
change shows up in the app.
