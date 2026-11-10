import { Fraunces_500Medium, Fraunces_600SemiBold } from '@expo-google-fonts/fraunces';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { configureFonts } from 'react-native-paper';
import { MD3Type, MD3TypescaleKey } from 'react-native-paper/lib/typescript/types';

export const fontAssets = {
  Fraunces_500Medium,
  Fraunces_600SemiBold,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
};

type FontName = keyof typeof fontAssets;

// Each loaded file is a single weight, so the weight lives in the family name. A numeric
// fontWeight would make Android drop the custom font and web synthesize a faux bold.
const face = (fontFamily: FontName): Partial<MD3Type> => ({ fontFamily, fontWeight: 'normal' });

const typescale: Record<MD3TypescaleKey | 'default', Partial<MD3Type>> = {
  displayLarge: face('Fraunces_500Medium'),
  displayMedium: face('Fraunces_500Medium'),
  displaySmall: face('Fraunces_600SemiBold'),
  headlineLarge: face('Fraunces_600SemiBold'),
  headlineMedium: face('Fraunces_600SemiBold'),
  headlineSmall: face('Fraunces_600SemiBold'),
  titleLarge: face('Inter_600SemiBold'),
  titleMedium: face('Inter_600SemiBold'),
  titleSmall: face('Inter_600SemiBold'),
  bodyLarge: face('Inter_400Regular'),
  bodyMedium: face('Inter_400Regular'),
  bodySmall: face('Inter_400Regular'),
  labelLarge: face('Inter_500Medium'),
  labelMedium: face('Inter_500Medium'),
  labelSmall: face('Inter_500Medium'),
  default: face('Inter_400Regular'),
};

export const fonts = configureFonts({ config: typescale });
