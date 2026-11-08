# Rebrand prototype (throwaway)

This branch holds a throwaway design prototype for a Trail Pack Pro rebrand. It is not meant to be merged into `main`.

## The question

What should the app look like after a redesign, given these constraints?

- Keep React Native Paper as the component library.
- Keep the current navigation (Locker, My Pack, Water, Categories, Settings tabs) and all existing functionality.
- Change only the theme (`src/theme/`) and the components we own (`src/components/`, tab bar options in `TabNavigator`).

## How to view it

```sh
open src/theme/rebrand.prototype.html
```

It's a single, self-contained HTML file; it isn't built with the real app code. Switch between options with the floating bar at the bottom, the ← / → keys, or `?variant=A|B|C` in the URL. Each option shows three phone mockups on shared sample gear data. Tabs, item +/−, pack selection, the water fill slider, "Empty pack", and unit settings all work.

Each option also lists the Material Design 3 color tokens for `src/theme/theme.ts`, a replacement for `chartColors`, fonts, corner rounding, and which owned components change.

## The options

| Key | Name | Direction |
| --- | --- | --- |
| A | Trailhead | Warm and earthy, like a national park map. Forest green, cream, ember accent, serif display font (Fraunces). |
| B | Golden Hour | Retro 1970s park poster. Deep teal, mustard, sienna, sunset stripes, round "patch" stats (Bricolage Grotesque). |
| C | Basecamp | Bright, friendly consumer app. Lake blue and coral, gradients, big rounded cards, floating tab bar (Plus Jakarta Sans). |

An earlier option B, "Gram Counter" (dark, monospace, technical), was rejected and replaced by Golden Hour.

## Status

A and C were the most interesting after the first round, and Golden Hour was added as the new B. No final direction has been chosen yet. Once one is picked (or a mix, such as A's hero card with C's tab bar), the decision should be rebuilt properly in the real theme and components on `main`. This prototype stays on this branch for reference.
