import chroma from 'chroma-js';
import { MD3LightTheme, MD3Theme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

import brand from './brandColors';
import { fonts } from './fonts';

type Sizes = number[];

interface AppColors extends MD3Colors {}

export interface AppTheme extends MD3Theme {
  colors: AppColors;
  space: Sizes;
  borderWeight: Sizes;
}

const space: Sizes = [0, 4, 8, 16, 32, 64];
const borderWeight: Sizes = [0, 1, 2, 3, 5, 8];

// Containers are tinted toward paper rather than brightened, so cream/forest/ember keep their warmth.
const tint = (color: string, amount: number) => chroma.mix(color, brand.paper, amount).hex();
const shade = (color: string) => chroma(color).darken(1.5).hex();
const towardParchment = (amount: number) => chroma.mix(brand.paper, brand.parchment, amount).hex();

const lightColors: AppColors = {
  ...MD3LightTheme.colors,
  primary: brand.forest,
  onPrimary: brand.cream,
  primaryContainer: brand.lichen,
  onPrimaryContainer: brand.forest,

  secondary: brand.sage,
  onSecondary: brand.paper,
  secondaryContainer: tint(brand.sage, 0.7),
  onSecondaryContainer: shade(brand.sage),

  tertiary: brand.ember,
  onTertiary: brand.white,
  tertiaryContainer: tint(brand.ember, 0.8),
  onTertiaryContainer: shade(brand.ember),

  error: brand.rust,
  onError: brand.white,
  errorContainer: tint(brand.rust, 0.8),
  onErrorContainer: shade(brand.rust),

  background: brand.cream,
  onBackground: brand.ink,

  surface: brand.paper,
  onSurface: brand.ink,
  surfaceVariant: brand.parchment,
  onSurfaceVariant: brand.moss,

  outline: brand.stone,
  outlineVariant: brand.sand,

  inverseSurface: brand.ink,
  inverseOnSurface: brand.cream,
  inversePrimary: tint(brand.forest, 0.6),

  surfaceDisabled: chroma(brand.ink).alpha(0.12).css(),
  onSurfaceDisabled: chroma(brand.ink).alpha(0.38).css(),
  backdrop: chroma(brand.ink).alpha(0.4).css(),

  elevation: {
    level0: 'transparent',
    level1: brand.paper,
    level2: towardParchment(0.25),
    level3: towardParchment(0.5),
    level4: towardParchment(0.65),
    level5: towardParchment(0.8),
  },
};

const theme: AppTheme = {
  ...MD3LightTheme,
  roundness: 3,
  fonts,
  space,
  borderWeight,
  colors: lightColors,
};

export { theme };
