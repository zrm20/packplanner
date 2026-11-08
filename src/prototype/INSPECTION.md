# Baseline Locker visual inspection (#32)

Captured with `yarn prototype:build && yarn prototype:screenshots` on 2026-11-07  
Branch: `ticket-32-mobile-preview`  
Direction: `baseline` (production theme)  
Machine evidence: `artifacts/prototype-screenshots/baseline/inspection-report.json`

## Viewports

| Name | Size | Files |
| --- | --- | --- |
| primary | 390×844 | `artifacts/prototype-screenshots/baseline/primary/locker.png` |
| narrow | 360×640 | `artifacts/prototype-screenshots/baseline/narrow/locker.png` |
| primary + safe-area insets 47/34 | 390×844 | `artifacts/prototype-screenshots/baseline/primary/locker--safe-area.png` |

## Outcomes

| Check | Primary | Narrow | Safe-area |
| --- | --- | --- | --- |
| Populated packs (Osprey, Gossamer Gear, ULA) | Pass | Pass | Pass |
| Populated inventory (liquids, Jacket brands, long names via scroll) | Pass | Pass | Pass |
| Clipping of chrome / tabs | None observed | None observed | Tabs clear bottom inset; heading clears top |
| Safe-area clearance | N/A (0 insets) | N/A | Pass (automated geometry + visual) |
| Readable content | Pass; long model names ellipsize on pack cards | Pass; denser but usable | Pass |
| Accessible scrolling | Inventory list scrolls; capture script scrolls to end | Same | Same |
| Existing navigation | Five tabs present; Locker selected | Same | Same |
| Firestore isolation | 0 requests (aborted + asserted) | Same | Same |

### Notes for #33–#35

- Current row hierarchy is **brand above name** (production baseline). Redesign variants should flip to name → brand → weight per #31.
- Long pack model / item names ellipsize; variants should preserve or improve truncation policy, not hide content.
- My Pack tab badge can look cramped with double-digit counts (`13` may appear clipped) — existing Paper badge behavior, unchanged by this harness.
- Browser Chromium ≠ native device parity; record that assumption in the #36 handoff.

## Reproduction

```sh
yarn install
npx playwright install chromium
yarn prototype:build
yarn prototype:screenshots
# Optional: PROTOTYPE_DIRECTION=restrained yarn prototype:screenshots
```

Interactive:

```sh
yarn prototype:web
# Open Expo web URL with ?direction=baseline&view=locker
```

See `README.md` and `VIEWPORTS.md` for query params, naming, and variant registration.
