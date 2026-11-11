import { StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  form: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    form: {
      flex: 1,
      justifyContent: 'center',
    },
  });
  return styles;
}
