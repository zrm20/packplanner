import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  textContainer: ViewStyle;
  weightContainer: ViewStyle;
  leftContainer: ViewStyle;
  weightIcon: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      flexDirection: 'row',
      paddingVertical: theme.space[1],
      paddingHorizontal: theme.space[2],
      alignItems: 'center',
      borderColor: theme.colors.outline,
      borderBottomWidth: 1,
    },
    textContainer: {
      flex: 1,
    },
    weightContainer: {
      padding: theme.space[1],
      alignItems: 'flex-end',
    },
    leftContainer: {
      marginRight: theme.space[2],
    },
    weightIcon: {
      fontSize: 20,
      color: theme.colors.primary,
    },
  });
  return styles;
}
