import { StyleSheet } from 'react-native';

import { useTheme } from '../../../theme';

export default function useStyles() {
  const { colors, space, roundness } = useTheme();
  return StyleSheet.create({
    scroll: { width: '100%', flex: 1 },
    content: { paddingHorizontal: space[3], paddingBottom: space[4] },
    chartContainer: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: space[3],
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.outlineVariant,
      borderRadius: roundness * 4,
      marginBottom: space[3],
    },
    eyebrow: { color: colors.tertiary, textTransform: 'uppercase', letterSpacing: 1.5 },
    caption: { color: colors.onSurfaceVariant, textAlign: 'center', paddingHorizontal: space[3] },
    empty: { padding: space[4], color: colors.onSurfaceVariant },
    section: { marginVertical: space[3], color: colors.primary },
  });
}
