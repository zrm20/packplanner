import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  title: TextStyle;
  row: ViewStyle;
  firstRow: ViewStyle;
  text: ViewStyle;
  name: TextStyle;
  brand: TextStyle;
  capacity: TextStyle;
  empty: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      flex: 1,
      minWidth: 0,
    },
    title: {
      marginBottom: theme.space[2],
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      fontWeight: '600',
      color: theme.colors.onSurfaceVariant,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[2],
      paddingVertical: theme.space[2] - 2,
      borderTopWidth: theme.borderWeight[1],
      borderTopColor: theme.colors.elevation.level3,
    },
    firstRow: {
      borderTopWidth: 0,
    },
    text: {
      flex: 1,
      minWidth: 0,
    },
    name: {
      fontWeight: '600',
    },
    brand: {
      color: theme.colors.onSurfaceVariant,
    },
    capacity: {
      fontWeight: '600',
      fontVariant: ['tabular-nums'],
      color: theme.colors.onSurfaceVariant,
    },
    empty: {
      color: theme.colors.onSurfaceVariant,
    },
  });
  return styles;
}
