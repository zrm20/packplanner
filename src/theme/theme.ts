import { MD3LightTheme, MD3Theme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import chroma from "chroma-js";

import brandColors from "./brandColors";

type Sizes = number[];

interface AppColors extends MD3Colors { };

export interface AppTheme extends MD3Theme {
  colors: AppColors;
  space: Sizes;
  borderWeight: Sizes;
};

const space: Sizes = [0, 4, 8, 16, 32, 64];
const borderWeight: Sizes = [0, 1, 2, 3, 5, 8];
const white = "#fff";
const primaryScale = chroma.scale([brandColors.primary, "white"]);
const secondaryScale = chroma.scale([brandColors.secondary, "white"]);
const tertiaryScale = chroma.scale([brandColors.tertiary, "white"]);

const lightColors: AppColors = {
  ...MD3LightTheme.colors,
  "primary": brandColors.primary,
  "onPrimary": white,
  "primaryContainer": chroma(brandColors.primary).brighten().hex(),
  "onPrimaryContainer": white,

  "secondary": brandColors.secondary,
  "onSecondary": white,
  "secondaryContainer": chroma(brandColors.secondary).brighten().hex(),
  "onSecondaryContainer": chroma(brandColors.secondary).darken().hex(),

  "tertiary": brandColors.tertiary,
  "onTertiary": white,
  "tertiaryContainer": chroma(brandColors.tertiary).brighten().hex(),
  "onTertiaryContainer": chroma(brandColors.tertiary).darken().hex(),

  "background": secondaryScale(.95).hex(),
  "onBackground": chroma(brandColors.primary).darken().darken().darken().hex(),

  "surface": white,
  "onSurface": brandColors.primary,
  "surfaceVariant": white,
  "onSurfaceVariant": "#44483d",

  "outline": "#75796c",
  "outlineVariant": "rgb(192, 201, 193)",

  "backdrop": "rgba(42, 50, 45, 0.4)"
};

const theme: AppTheme = {
  ...MD3LightTheme,
  roundness: 1,
  space,
  borderWeight,
  colors: lightColors,
};

export {
  theme,
};
