import { StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  scrollView: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      width: '100%',
      flex: 1,
      marginBottom: theme.space[1],
    },
  });
  return styles;
}
