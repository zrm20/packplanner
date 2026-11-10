import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  button: ViewStyle;
  qty: TextStyle;
  icon: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: 999,
    },
    button: {
      margin: 0,
      width: 26,
      height: 30,
    },
    qty: {
      minWidth: 12,
      textAlign: 'center',
      color: theme.colors.primary,
      fontWeight: '600',
    },
    icon: {
      color: theme.colors.primary,
    },
  });
  return styles;
}
