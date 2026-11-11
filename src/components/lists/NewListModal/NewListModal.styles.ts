import { StyleSheet } from 'react-native';

import { useTheme } from '../../../theme';

export default function useStyles() {
  const { colors, space, roundness, fonts } = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderRadius: roundness * 5,
      maxHeight: '90%',
    },
    title: { ...fonts.headlineLarge },
    context: {
      padding: space[3],
      marginTop: space[3],
      backgroundColor: colors.surface,
      borderRadius: roundness * 4,
      borderWidth: 1,
      borderColor: colors.outlineVariant,
      gap: space[1],
    },
    eyebrow: { color: colors.tertiary, textTransform: 'uppercase', letterSpacing: 1.5 },
    input: { marginTop: space[3], backgroundColor: colors.surface },
    actions: { flexDirection: 'column', alignItems: 'stretch', gap: space[2], padding: space[3] },
  });
}
