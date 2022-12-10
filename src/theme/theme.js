import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

const space = [0, 4, 8, 16, 32, 64];

const borderWeight = [0, 1, 2, 3, 5, 8];

const lightColors = {
  "primary": "#446813",
  "onPrimary": "#ffffff",
  "primaryContainer": "#c4f18c",
  "onPrimaryContainer": "#102000",
  "secondary": "#875200",
  "onSecondary": "#ffffff",
  "secondaryContainer": "#ffddba",
  "onSecondaryContainer": "#2b1700",
  "tertiary": "#246c2c",
  "onTertiary": "#ffffff",
  "tertiaryContainer": "#a9f5a5",
  "onTertiaryContainer": "#002105",
  "error": "#ba1a1a",
  "onError": "#ffffff",
  "errorContainer": "#ffdad6",
  "onErrorContainer": "#410002",
  "background": "#f7ffec",
  "onBackground": "#082100",
  "surface": "#f7ffec",
  "onSurface": "#082100",
  "surfaceVariant": "#e1e4d5",
  "onSurfaceVariant": "#44483d",
  "outline": "#75796c",
  "outlineVariant": "rgb(192, 201, 193)",
  "shadow": "rgb(0, 0, 0)",
  "scrim": "rgb(0, 0, 0)",
  "inverseSurface": "rgb(46, 49, 46)",
  "inverseOnSurface": "rgb(239, 241, 237)",
  "inversePrimary": "rgb(115, 218, 165)",
  "elevation": {
    "level0": "transparent",
    "level1": "rgb(238, 246, 239)",
    "level2": "rgb(231, 241, 234)",
    "level3": "rgb(223, 237, 228)",
    "level4": "rgb(221, 236, 227)",
    "level5": "rgb(216, 233, 223)"
  },
  "surfaceDisabled": "rgba(25, 28, 26, 0.12)",
  "onSurfaceDisabled": "rgba(25, 28, 26, 0.38)",
  "backdrop": "rgba(42, 50, 45, 0.4)"
};

const darkColors = {
  "primary": "#a8d473",
  "onPrimary": "#1f3700",
  "primaryContainer": "#2f4f00",
  "onPrimaryContainer": "#c4f18c",
  "secondary": "#ffb865",
  "onSecondary": "#482a00",
  "secondaryContainer": "#673d00",
  "onSecondaryContainer": "#ffddba",
  "tertiary": "#8ed88b",
  "onTertiary": "#00390d",
  "tertiaryContainer": "#015316",
  "onTertiaryContainer": "#a9f5a5",
  "error": "#ffb4ab",
  "onError": "#690005",
  "errorContainer": "#93000a",
  "onErrorContainer": "#ffdad6",
  "background": "#082100",
  "onBackground": "#b9f396",
  "surface": "#082100",
  "onSurface": "#b9f396",
  "surfaceVariant": "#44483d",
  "onSurfaceVariant": "#c5c8ba",
  "outline": "#8f9285",
  "outlineVariant": "rgb(64, 73, 67)",
  "shadow": "rgb(0, 0, 0)",
  "scrim": "rgb(0, 0, 0)",
  "inverseSurface": "rgb(225, 227, 223)",
  "inverseOnSurface": "rgb(46, 49, 46)",
  "inversePrimary": "rgb(0, 108, 70)",
  "elevation": {
    "level0": "transparent",
    "level1": "rgb(30, 38, 33)",
    "level2": "rgb(32, 43, 37)",
    "level3": "rgb(35, 49, 41)",
    "level4": "rgb(36, 51, 43)",
    "level5": "rgb(38, 55, 46)"
  },
  "surfaceDisabled": "rgba(225, 227, 223, 0.12)",
  "onSurfaceDisabled": "rgba(225, 227, 223, 0.38)",
  "backdrop": "rgba(42, 50, 45, 0.4)"
};

const theme = {
  ...MD3LightTheme,
  roundness: 1,
  space,
  borderWeight,
  colors: lightColors,
};

const darkTheme = {
  ...MD3DarkTheme,
  roundness: theme.roundness,
  space: theme.space,
  borderWeight: theme.borderWeight,
  colors: darkColors
};

export {
  theme,
  darkTheme
};


