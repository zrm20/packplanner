import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  input: TextStyle;
  toggleGroup: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
    },
    input: {
      flex: 1,
    },
    toggleGroup: {
      marginLeft: theme.space[3],
    },
  });
  return styles;
}
