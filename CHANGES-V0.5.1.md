# Santi Arcade V0.5.1 — PWA Auto-Update System

## Scope

V0.5.1 is a technical update built directly on V0.5. It does not add a world, alter City Quest, or change player progress. No remote repository was modified or published.

## Modified files

- `index.html` — uses versioned core-resource URLs, displays the release in Settings, and adds the child-friendly update dialog.
- `css/styles.css` — styles the version label and update dialog without changing the existing visual system.
- `js/app.js` — adds the Update Manager, safe-screen deferral, network-return and foreground checks, controlled activation, and one-time reload handling.
- `service-worker.js` — uses cache `santi-arcade-v0.5.1`, installs atomically, waits for approval, removes older Santi Arcade caches after activation, uses network-first navigation, and preserves offline fallbacks.
- `manifest.json` — updates the release description.
- `README.md` — documents V0.5.1 and the repeatable release procedure.

## New files

- `version.json` — small published-version source fetched with `cache: "no-store"`.
- `CHANGES-V0.5.1.md` — this record.

## Removed files

None.

## Update Manager

The app checks `version.json` at launch, after returning from the background, and when connectivity returns. Checks are throttled to five minutes except for explicit launch/online checks. If a new service worker finishes installing, the update is staged. The dialog is shown only outside active gameplay. **UPDATE NOW** sends `SKIP_WAITING`; `controllerchange` then performs one guarded reload.

Navigation is network-first with an offline `index.html` fallback. Changed core resources use release-specific query strings, preventing a new page from loading old CSS or JavaScript. The service worker caches the complete release before it can become active, so a partially downloaded version cannot replace the working version.

## Progress protection

The updater modifies Cache Storage only. It never calls `localStorage.clear()`, never removes `santiArcadeSave`, and never changes player save keys. Nickname, avatar, accessories, coins, stars, unlocked levels, best results, Power Energy, audio settings, and tutorials remain on the device.

## Future release procedure

1. Change the application files.
2. Increment `APP_VERSION` in `js/app.js`.
3. Increment the query strings for `css/styles.css`, `js/app.js`, and `manifest.json` in `index.html`.
4. Increment `version.json`.
5. Increment `CACHE` and matching core URLs in `service-worker.js`.
6. Add new offline-required assets to `CORE`.
7. Test online launch, offline launch, update deferral during gameplay, **UPDATE NOW**, one reload, and saved-progress retention.
8. Publish only after approval.

## Upgrade test

- Start the previous release under its existing service worker with a populated `santiArcadeSave`.
- Serve the next release from the same origin and scope.
- Open or foreground the app online.
- Confirm the new worker becomes waiting and the prompt appears only on a safe screen.
- Press **UPDATE NOW** and confirm one reload.
- Confirm Settings shows the new version, core resources have the same release query, old Santi Arcade caches are gone, offline play works, and the original save value is unchanged.
- Repeat with a test version bump to confirm the mechanism is reusable.

## Platform limitations

- Android/Chromium normally checks service workers promptly, but exact scheduling remains controlled by the browser and operating system.
- iOS/Safari supports the same standards with less predictable background execution. Opening or returning to the app while online gives it the opportunity to check; the OS may still delay background work.
- No web PWA can guarantee an update while the application is never opened or the operating system denies network/background activity.

## Package confirmation

`README.md`, `version.json`, and this file are included in `santi-arcade-v0.5.1-changed-files.zip`. Cache identity: `santi-arcade-v0.5.1`.
