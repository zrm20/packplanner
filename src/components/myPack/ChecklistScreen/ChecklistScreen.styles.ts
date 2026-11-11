import { StyleSheet } from 'react-native';

import { useTheme } from '../../../theme';

export default function useStyles() {
  const { colors, space, roundness } = useTheme();
  return StyleSheet.create({
    list: { width: '100%', flex: 1 },
    content: { paddingHorizontal: space[3], paddingBottom: space[4] },
    progress: {
      padding: space[3],
      backgroundColor: colors.surface,
      borderRadius: roundness * 4,
      borderWidth: 1,
      borderColor: colors.outlineVariant,
    },
    eyebrow: {
      color: colors.tertiary,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      marginBottom: space[2],
    },
    bar: { marginTop: space[3], height: 6, borderRadius: roundness },
    filters: { marginVertical: space[3] },
    section: { marginTop: space[3], marginBottom: space[2], color: colors.primary },
    item: {
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderColor: colors.outlineVariant,
      paddingHorizontal: space[2],
    },
    quantity: { alignSelf: 'center', color: colors.onSurfaceVariant },
    empty: { paddingVertical: space[4], color: colors.onSurfaceVariant },
  });
}
