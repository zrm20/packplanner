import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  header: ViewStyle;
  headerCell: TextStyle;
  row: ViewStyle;
  firstRow: ViewStyle;
  totalRow: ViewStyle;
  rowLabel: ViewStyle;
  value: TextStyle;
  totalNow: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      width: '100%',
      backgroundColor: theme.colors.surface,
      borderWidth: theme.borderWeight[1],
      borderColor: theme.colors.outlineVariant,
      borderRadius: 14,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.space[2],
      paddingHorizontal: theme.space[3],
      borderBottomWidth: theme.borderWeight[1],
      borderBottomColor: theme.colors.elevation.level3,
    },
    headerCell: {
      flex: 1,
      textAlign: 'right',
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      fontWeight: '600',
      color: theme.colors.onSurfaceVariant,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.space[2] + 2,
      paddingHorizontal: theme.space[3],
      borderTopWidth: theme.borderWeight[1],
      borderTopColor: theme.colors.elevation.level3,
    },
    firstRow: {
      borderTopWidth: 0,
    },
    totalRow: {
      backgroundColor: theme.colors.elevation.level2,
    },
    rowLabel: {
      flex: 1.4,
    },
    value: {
      flex: 1,
      textAlign: 'right',
      fontWeight: '600',
      fontVariant: ['tabular-nums'],
    },
    totalNow: {
      color: theme.colors.tertiary,
    },
  });
  return styles;
}
