# Disposable mobile preview harness (#32)

Throwaway scaffolding for PackPlanner redesign prototypes (parent [#31](https://github.com/zrm20/packplanner/issues/31)).  
**Do not treat this as production.** Delete with the prototype branch once a direction is selected and implemented.

## What this provides

| Piece | Path | Reuse for #33–#35 |
| --- | --- | --- |
| Deterministic gear fixture | `fixtureDataset.ts` | Same dataset for all directions |
| Non-persisted Redux hydrate | `createPrototypeStore.ts` | No live auth / Firestore / PersistGate |
| Prototype App entry | `PrototypeApp.tsx` | Gated by `EXPO_PUBLIC_PROTOTYPE=1` |
| View/state selection | query params (`parsePrototypeQuery.ts`) | No new product navigation |
| Theme registry | `themes/` | Register `restrained` / `warm` / `expressive` themes (+ optional component overrides) |
| Viewports + naming | `VIEWPORTS.md` | Shared primary/narrow + screenshot paths |
| Capture workflow | `scripts/capture-prototype-screenshots.cjs` | Set `PROTOTYPE_DIRECTION=restrained` etc. |

Production `App.tsx` behavior is unchanged unless the prototype env flag is set at bundle time. There is no production-facing design switcher.

## Commands

```sh
# Interactive prototype web (fixture Locker by default)
yarn prototype:web
# Then open the Expo web URL with e.g. ?direction=baseline&view=locker

# Static export + screenshot capture (primary + narrow Locker)
yarn prototype:build
yarn prototype:screenshots

# Capture a future direction once its theme is registered
PROTOTYPE_DIRECTION=restrained yarn prototype:screenshots
```

Against a running Expo web server:

```sh
EXPO_PUBLIC_PROTOTYPE=1 yarn web
# other terminal:
PWA_DEV_URL=http://127.0.0.1:8081 yarn prototype:screenshots
```

## Isolation

- Prototype navigator never calls `useAuth` / `useSubscribeToFirestore`.
- Store is preloaded from `fixtureDataset` (no Firebase reads).
- Capture script still stubs Identity Toolkit and **aborts Firestore**, asserting zero Firestore requests during Locker captures.

## Matrix views (query `view=`)

`locker` · `mypack` · `chart` · `checklist` · `water` · `new-item` · `edit-item` · `edit-item-liquid` · `new-pack` · `edit-pack` · `form-validation`

Water / chart partial fill defaults to **45%** (`waterFill` / `chartLiquid` query params).

## Variant extension (#33–#35)

1. Add `themes/restrained.ts` (etc.) exporting an `AppTheme`.
2. Register it in `themes/index.ts` (replace the baseline placeholder).
3. Optionally attach reusable component overrides on the registry entry.
4. Run `PROTOTYPE_DIRECTION=<id> yarn prototype:screenshots` (or open `?direction=<id>&view=…`).
5. Keep screenshot paths under `artifacts/prototype-screenshots/<direction>/…` per `VIEWPORTS.md`.

## Assumptions

Browser Chromium screenshots establish the mobile PWA visual comparison. They do **not** prove native iOS/Android or installed-device parity (#31 testing decisions).
