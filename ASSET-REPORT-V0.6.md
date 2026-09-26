# Santi Arcade V0.6 — Asset Report

Date: 2026-09-26

## Size summary

| Category | Bytes | Approx. MiB |
| --- | ---: | ---: |
| Complete project (excluding Git metadata) | 1,469,801 | 1.40 |
| Image assets (`assets/`) | 968,467 | 0.92 |
| Audio assets (`sounds/`) | 286,224 | 0.27 |

V0.6 adds no image or audio media files. Its new gameplay art, stadium feedback and dynamic sound cues are generated with Canvas, CSS and Web Audio. Pronunciation uses device speech synthesis.

## Largest files

| File | Bytes |
| --- | ---: |
| `assets/city-panorama.webp` | 150,826 |
| `sounds/menu-theme.mp3` | 137,970 |
| `sounds/city-quest-theme.mp3` | 117,072 |
| `assets/hero-3.webp` | 106,798 |
| `assets/hero-4.webp` | 106,034 |
| `assets/hero-6.webp` | 103,304 |
| `assets/hero-0.webp` | 103,140 |
| `assets/hero-1.webp` | 102,308 |
| `assets/hero-2.webp` | 101,966 |
| `assets/hero-5.webp` | 100,018 |
| `assets/hero-7.webp` | 92,466 |

## Initial / core cache

Initial installation includes Home/City code, `js/city-seasons.js`, `js/platform-v06.js`, manifest/version/README, all existing hero and City images, QR, icons and the three existing compressed music tracks. This preserves immediate offline City Quest Seasons and platform startup.

## Lazy-loaded by world

- **Spelling Champions:** `data/grade3-words.js` is requested only on first entry and then runtime-cached. Sports visuals/audio are generated, so there is no separate media download.
- **City Quest:** no new lazy media; the preserved campaign remains in the core offline set.
- **Future worlds:** should keep curricula and media outside `CORE` and allow the runtime network-first/cache-fallback route to store them after first use.

## Growth controls

- No framework dependency.
- No pronunciation MP3 library.
- No future-world assets.
- Existing WebP/MP3 formats retained without unnecessary re-encoding.
