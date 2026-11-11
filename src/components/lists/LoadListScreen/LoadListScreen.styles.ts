import { StyleSheet } from 'react-native';

import { useTheme } from '../../../theme';

export default function useStyles() {
  const { colors, space, roundness } = useTheme();
  return StyleSheet.create({
    container: {},
    listContainer: { width: '100%', flex: 1 },
    content: { paddingHorizontal: space[3], paddingBottom: space[4] },
    hint: { color: colors.onSurfaceVariant, marginBottom: space[3] },
    card: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.outlineVariant,
      borderRadius: roundness * 4,
      padding: space[3],
      marginBottom: space[3],
      gap: space[2],
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginTop: space[2],
    },
    danger: { color: colors.error },
    emptyText: { color: colors.onSurfaceVariant, paddingVertical: space[4] },
  });
}
