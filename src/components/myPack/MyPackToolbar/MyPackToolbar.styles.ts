import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  chip: ViewStyle;
  chipLabel: TextStyle;
  dangerIcon: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[2],
      paddingHorizontal: theme.space[3],
    },
    chip: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.outline,
      borderRadius: 999,
    },
    chipLabel: {
      color: theme.colors.onSurface,
    },
    dangerIcon: {
      color: theme.colors.error,
    },
  });
  return styles;
}
