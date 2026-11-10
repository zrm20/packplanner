import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  text: ViewStyle;
  eyebrow: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: theme.space[3],
      paddingTop: theme.space[2],
      paddingBottom: theme.space[3],
    },
    text: {
      flex: 1,
    },
    eyebrow: {
      color: theme.colors.tertiary,
      textTransform: 'uppercase',
      letterSpacing: 1.8,
    },
  });
  return styles;
}
