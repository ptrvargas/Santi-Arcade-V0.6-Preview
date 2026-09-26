# Santi Arcade V0.6 — Test Report

Date: 2026-09-26  
Target: local release candidate, not published

`PASS` means the stated automated checks completed successfully. `FAIL` means the mandatory end-to-end device/browser verification was not available in this build environment; it does **not** assert that the feature is broken. No unexecuted test is presented as passed.

| Group | Status | Evidence / remaining work |
| --- | --- | --- |
| A. City Quest regression | FAIL | JavaScript parses, all ten original `LEVELS`, engine and assets remain present; a full play-through of every level on a real touch browser was not executed. |
| B. V0.5.1 migration | PASS | Executed the actual migration prefix against a simulated legacy save. Nickname, combined avatar accessories, Level 11 unlock state, coins, stars, audio, volume, Power Energy and tutorial flag remained unchanged. Level 10 completion became Season 1 Champion; math mastery remained empty. |
| C. Spelling | FAIL | 293 unique, valid curriculum records; modes/mastery/hint/sentence/TTS paths parse and static checks pass. Real-device TTS voice output and complete interaction runs were not available. |
| D. Sports | FAIL | Basketball, soccer, football, baseball and championship Canvas paths are present and parse. Real touch timing, scoring feel and all-event play-through remain manual acceptance tests. |
| E. Sharing | FAIL | Exact production URL and three card paths were inspected; safe File/Web Share/download/copy fallbacks are implemented. Native Android/iOS share sheets and decoded QR scan were not device-tested here. |
| F. Help / Install | FAIL | Contextual sections, one-time coach state, Android prompt route and iOS instructions are present. Native install prompts cannot be triggered in this environment. |
| G. Audio | FAIL | Existing tracks remained intact; settings persistence and new synthesized motif/stadium functions parse. Simultaneous sound quality requires listening on target devices. |
| H. PWA update | PASS | `version.json` is 0.6.0; cache is `santi-arcade-v0.6.0`; every core path exists; waiting-worker message, `clients.claim`, old-cache deletion, no-store version check and one-reload guard are present. HTTP fetch smoke test passed. Installed 0.5.1→0.6 activation must still receive final device acceptance before publishing. |
| I. Responsive | FAIL | Mobile-first portrait/landscape/tablet/desktop CSS rules are present. Pixel/touch acceptance on the named physical device classes was not possible here. |
| J. City Quest Seasons | PASS | Sixteen automated assertions passed: 1→2, 2→3, 3→4, 4→5, Champion N→N+1, mission/reward persistence, older-season return, Continue routing, JSON reload, legacy migration, Champion objective variation, mastery weighting and non-destructive review after one error. |

## Automated checks executed

- `node --check`: `js/city-seasons.js`, `js/app.js`, `js/platform-v06.js`, `data/grade3-words.js`, `service-worker.js` — PASS.
- `node tests/city-seasons.test.js` — PASS: 16 assertions covering every requested season transition and persistence behavior.
- Local HTTP GET: `/`, `version.json`, versioned platform script and lazy word bank — PASS.
- HTML resource path existence — PASS; no missing referenced files.
- Word bank validation — PASS: 293 records, 293 unique, six curricular groups, zero missing required metadata.
- Service-worker static contract — PASS: cache identity, old-cache cleanup, controlled skip waiting, client claim, no-store version request and all core files.
- Migration execution — PASS as detailed above.
- Archive integrity checks — performed after packaging; see delivery summary/checksums.

## Manual acceptance checklist before publication

1. Play all ten levels in Seasons 1–4 plus representative Champion Seasons and confirm physics/difficulty match V0.5.1, missions are understandable, and every pit is visible before approach.
2. Exercise all spelling modes with and without TTS and offline after first Sports World load.
3. Complete every sport Learn/Match event and a win/loss Championship path.
4. Generate, share/download and visually inspect each card; scan the Invite QR.
5. Install on Android Chrome and iOS Safari; test 0.5.1→0.6 update, background return, reconnect, one reload and retained save.
6. Inspect portrait Home/Profile and landscape gameplay on small Android, iPhone-size, tablet and desktop viewports.

Because those mandatory real-browser/device checks remain open, this report does not mark the release as final or authorize publication.
