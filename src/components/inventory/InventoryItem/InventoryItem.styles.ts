import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  textContainer: ViewStyle;
  weightContainer: ViewStyle;
  leftContainer: ViewStyle;
  addButton: ViewStyle;
  name: TextStyle;
  brand: TextStyle;
  weight: TextStyle;
  liquid: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      flexDirection: 'row',
      paddingVertical: theme.space[2] + 3,
      paddingHorizontal: theme.space[2] + 4,
      alignItems: 'center',
      gap: theme.space[2] + 4,
      borderColor: theme.colors.elevation.level3,
      borderTopWidth: theme.borderWeight[1],
    },
    textContainer: {
      flex: 1,
      minWidth: 0,
    },
    weightContainer: {
      alignItems: 'flex-end',
    },
    leftContainer: {
      flexShrink: 0,
    },
    addButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 1.5,
      borderStyle: 'dashed',
      borderColor: theme.colors.outlineVariant,
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      fontWeight: '600',
    },
    brand: {
      color: theme.colors.onSurfaceVariant,
    },
    weight: {
      fontWeight: '600',
      fontVariant: ['tabular-nums'],
    },
    liquid: {
      color: theme.colors.onSurfaceVariant,
    },
  });
  return styles;
}
