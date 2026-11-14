# Trailhead draft assets

File-swappable draft art for Trail Pack Pro. `logo.svg` is the editable vector
master: forest `#2F4A3A`, cream `#F4EFE4`, ember `#D9682B`. The mark deliberately
contains no lettering; in-app text inherits Fraunces/Inter from the Paper theme.

Replace these PNGs in place to ship final artwork without component changes:

| File                            | Size                          | Usage                                                    |
| ------------------------------- | ----------------------------- | -------------------------------------------------------- |
| `logo.png`                      | 1024 × 1024, transparent      | In-app welcome screen                                    |
| `splash.png`                    | 1024 × 1024, cream background | Expo native launch, contained at 240 logical pixels      |
| `icon.png`                      | 1024 × 1024, opaque           | iOS and standard app icon                                |
| `adaptive-icon.png`             | 1024 × 1024, transparent      | Android foreground; cream background comes from app.json |
| `../favicon.png`                | 48 × 48, opaque               | Browser favicon                                          |
| `../../public/pwa/icon-180.png` | 180 × 180, opaque             | Apple touch icon                                         |
| `../../public/pwa/icon-192.png` | 192 × 192, opaque             | Web manifest and offline page                            |
| `../../public/pwa/icon-512.png` | 512 × 512, opaque             | Web manifest / installed launch                          |

Keep adaptive foreground artwork inside the central safe circle (diameter
approximately 66% of the canvas). The draft badge fits within this area.

To regenerate these drafts from `logo.svg`, run:

```sh
npx playwright install chromium
node scripts/generate-brand-assets.cjs
# Or use an existing Chrome:
CHROME_BIN='/path/to/chrome' node scripts/generate-brand-assets.cjs
```

Preview every generated PNG at its actual pixel size before committing. Confirm
one complete, centered mark with clear margins, especially in the 180px Apple
touch icon and 192px manifest icon used by installed web apps.

Regeneration overwrites the PNGs above; skip it when replacing them with final
artwork. No generation runs during normal development or build. Expo config
refreshes the embedded offline-page icon on the next start/export.

Native images are copied at build time: regenerate the ignored native projects
with `npx expo prebuild` and rebuild after replacing assets. Existing installed
PWAs may retain old OS-cached icons; remove and re-add them to verify replacements.
