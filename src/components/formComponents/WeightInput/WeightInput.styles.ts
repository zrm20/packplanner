import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  inputContainer: ViewStyle;
  textInput: TextStyle;
  unitSelector: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      width: '100%',
      marginBottom: theme.space[2],
      paddingHorizontal: theme.space[3],
    },
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
    },
    unitSelector: {
      marginLeft: theme.space[3],
    },
  });
  return styles;
}
