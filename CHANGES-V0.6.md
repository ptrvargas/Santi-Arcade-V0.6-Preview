# Santi Arcade V0.6 — Change Log

## New platform experience

- New world-selection Home with global Player, Share, Help and Settings navigation.
- Player Profile with cross-world statistics, editable avatar/nickname and My Collection.
- Achievements with optional sharing and permanent trophies, badges, gear and card designs.
- Progress, achievement and invite share cards using real local statistics and the exact live URL.
- Contextual Help Center, one-time coach marks, install guidance and Credits.

## City Quest

- Preserved the existing ten-level engine, controls, physics, checkpoints, hearts, questions, powers and progression.
- **Season 1 — City Rookie:** the original ten-level campaign, including migrated progress, Level 10 championship recognition and Season 2 unlock.
- **Season 2 — City Explorer:** a playable ten-level campaign with four persistent missions per level. Finishing unlocks the next level even when optional missions remain incomplete. The finale grants the City Explorer Cup, Explorer Jacket, City Night Share Card and Season 3.
- **Season 3 — Power Quest:** a playable ten-level campaign with Power Energy at entry, Shield/Turbo objectives, energy missions and safe recombinations of coins, questions and bonuses. The finale grants permanent Power Quest rewards and Season 4.
- **Season 4 — Math Challenge:** a playable ten-level campaign whose question skills are weighted by `PRACTICING`, `CHALLENGE`, `MASTERED` and `REVIEW`. One error moves a mastered skill to review instead of erasing mastery. The finale grants permanent Math Challenge rewards and Season 5.
- **Season 5+ — Champion Seasons:** every numbered season is playable. Deterministic season/level generation changes math, missions, coin targets, optional stars, bonuses, visual accent and audio motif while retaining the approved platform courses. Each finale persists a championship/reward and unlocks N+1.
- Added previous/next season navigation so completed seasons remain replayable for unfinished missions. Home and Profile use the active season's persisted Continue target.
- Increased pit readability with illuminated edges, depth gradients and non-color-only markings.
- Added level-group musical motifs without replacing existing audio files.

## Spelling Champions

- New ten-event sports season: Training Camp; Basketball, Soccer, Football and Baseball Learn/Match events; Championship.
- Fill the Word, Build the Word and optional Word Builder interactions without keyboard typing.
- Adaptive NEW → PRACTICING → CHALLENGE → MASTERED word records, delayed repetition and mastered review.
- 293 unique Grade 3 words organized by difficulty, spelling pattern, high frequency, syllables, morphology and challenge level.
- Device-selected `en-US` speech synthesis, sentence and hint controls, plus visible fallback messaging.
- Interactive Canvas sports play, power advantages, positive retry language and a seven-of-twelve championship threshold.

## Data migration and privacy

- Added central `dataVersion: 6` player data while retaining the original `santiArcadeSave` key and legacy fields.
- Preserves nickname, avatar, unlocked City level, coins, stars, scores, energy, settings and tutorials.
- A completed V0.5.1 Level 10 becomes City Quest Season 1 Champion; no historical mastery is fabricated.
- No account, email, location, contacts, photographs, advertising, purchases or internal social graph.

## PWA and performance

- Version/cache updated to `0.6.0` / `santi-arcade-v0.6.0`.
- Core resources are installed atomically; same-origin resources use network-first with cached fallback to prevent mixed releases.
- Update activation remains user-controlled and reload-loop guarded; service worker never touches `localStorage`.
- Spelling curriculum is lazy-loaded and runtime-cached, with no new large image/audio downloads.

## Files

Modified: `index.html`, `css/styles.css`, `js/app.js`, `manifest.json`, `service-worker.js`, `version.json`, `README.md`.

New: `js/city-seasons.js`, `js/platform-v06.js`, `data/grade3-words.js`, `tests/city-seasons.test.js`, `CHANGES-V0.6.md`, `TEST-REPORT-V0.6.md`, `ASSET-REPORT-V0.6.md`.

## Adding future worlds

Future worlds should be separate lazy modules with their own data namespace. They reuse the global Home, Player Profile, settings, achievements, collection, help, sharing and persistence APIs. Migration adds defaults only, and world assets are cached on first entry unless required for initial offline startup.
