import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  title: TextStyle;
  input: ViewStyle;
  actions: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {},
    title: {
      textAlign: 'center',
    },
    input: {
      marginTop: theme.space[3],
      backgroundColor: theme.colors.background,
    },
    actions: {
      justifyContent: 'space-evenly',
    },
  });
  return styles;
}
