# Prototype screenshot viewports (#32)

Disposable conventions for PackPlanner redesign prototypes (#31–#36).

## Viewport pair

| Name | Width × Height | Notes |
| --- | --- | --- |
| `primary` | **390 × 844** | Portrait phone (iPhone-like); matches existing PWA check portrait size |
| `narrow` | **360 × 640** | Narrower portrait for density / clipping checks |

Safe-area insets for inspection (optional CDP override, same as `scripts/check-pwa.cjs`):

- Top: `47`
- Bottom: `34`

Primary captures use insets `0/0` unless a ticket asks otherwise. Narrow checks use the same inset policy as the capture being compared.

## Screenshot path naming

```text
artifacts/prototype-screenshots/{direction}/{viewport}/{view}[--{state}].png
```

| Segment | Values |
| --- | --- |
| `direction` | `baseline` (#32), `restrained` (#33), `warm` (#34), `expressive` (#35) |
| `viewport` | `primary` \| `narrow` |
| `view` | `locker` \| `mypack` \| `chart` \| `checklist` \| `water` \| `new-item` \| `edit-item` \| `new-pack` \| `edit-pack` \| `form` |
| `state` (optional) | e.g. `liquid`, `validation`, `partial-fill` |

Examples:

- `baseline/primary/locker.png`
- `baseline/narrow/locker.png`
- `restrained/primary/edit-item--liquid.png`
- `warm/primary/form--validation.png`
- `expressive/primary/water--partial-fill.png`

## Query params (prototype entry only)

Enabled only when `EXPO_PUBLIC_PROTOTYPE=1`. Production builds ignore these.

| Param | Purpose |
| --- | --- |
| `direction` | Theme id (`baseline`, `restrained`, `warm`, `expressive`) |
| `view` | Initial screen/state (see `view` values above) |
| `narrow` | `1` selects narrow viewport hints for local debugging (capture script sets size itself) |
| `waterFill` | Water fill percent `0–100` (default `45`) |
| `chartLiquid` | Chart liquid level percent `0–100` (default `45`) |
