import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  submit: ViewStyle;
  errorText: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      width: '100%',
      alignItems: 'center',
    },
    submit: {
      marginTop: theme.space[2],
    },
    errorText: {
      color: theme.colors.error,
      marginTop: theme.space[2],
    },
  });
  return styles;
}
