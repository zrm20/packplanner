import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

const space = [0, 4, 8, 16, 32, 64];

const borderWeight = [0, 1, 2, 3, 5, 8];

const lightColors = {
  "primary": "rgb(0, 108, 70)",
  "onPrimary": "rgb(255, 255, 255)",
  "primaryContainer": "rgb(143, 247, 191)",
  "onPrimaryContainer": "rgb(0, 33, 18)",
  "secondary": "rgb(78, 99, 86)",
  "onSecondary": "rgb(255, 255, 255)",
  "secondaryContainer": "rgb(208, 232, 215)",
  "onSecondaryContainer": "rgb(11, 31, 21)",
  "tertiary": "rgb(60, 100, 114)",
  "onTertiary": "rgb(255, 255, 255)",
  "tertiaryContainer": "rgb(191, 233, 249)",
  "onTertiaryContainer": "rgb(0, 31, 40)",
  "error": "rgb(186, 26, 26)",
  "onError": "rgb(255, 255, 255)",
  "errorContainer": "rgb(255, 218, 214)",
  "onErrorContainer": "rgb(65, 0, 2)",
  "background": "rgb(251, 253, 248)",
  "onBackground": "rgb(25, 28, 26)",
  "surface": "rgb(251, 253, 248)",
  "onSurface": "rgb(25, 28, 26)",
  "surfaceVariant": "rgb(220, 229, 220)",
  "onSurfaceVariant": "rgb(64, 73, 67)",
  "outline": "rgb(112, 121, 114)",
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
  "primary": "rgb(115, 218, 165)",
  "onPrimary": "rgb(0, 56, 34)",
  "primaryContainer": "rgb(0, 82, 51)",
  "onPrimaryContainer": "rgb(143, 247, 191)",
  "secondary": "rgb(180, 204, 187)",
  "onSecondary": "rgb(32, 53, 41)",
  "secondaryContainer": "rgb(54, 75, 63)",
  "onSecondaryContainer": "rgb(208, 232, 215)",
  "tertiary": "rgb(164, 205, 221)",
  "onTertiary": "rgb(5, 53, 66)",
  "tertiaryContainer": "rgb(35, 76, 89)",
  "onTertiaryContainer": "rgb(191, 233, 249)",
  "error": "rgb(255, 180, 171)",
  "onError": "rgb(105, 0, 5)",
  "errorContainer": "rgb(147, 0, 10)",
  "onErrorContainer": "rgb(255, 180, 171)",
  "background": "rgb(25, 28, 26)",
  "onBackground": "rgb(225, 227, 223)",
  "surface": "rgb(25, 28, 26)",
  "onSurface": "rgb(225, 227, 223)",
  "surfaceVariant": "rgb(64, 73, 67)",
  "onSurfaceVariant": "rgb(192, 201, 193)",
  "outline": "rgb(138, 147, 139)",
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


