import { StyleSheet } from 'react-native';

import { useTheme } from '../../../theme';

export default function useStyles() {
  const { colors, space, roundness } = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: roundness * 4,
      borderWidth: 1,
      borderColor: colors.outlineVariant,
      paddingHorizontal: space[3],
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: space[3],
      gap: space[2],
      borderBottomWidth: 1,
      borderColor: colors.outlineVariant,
    },
    legendItemColor: { width: 12, height: 12, borderRadius: 6 },
    name: { flex: 1, flexShrink: 1 },
    figures: { alignItems: 'flex-end' },
  });
}
