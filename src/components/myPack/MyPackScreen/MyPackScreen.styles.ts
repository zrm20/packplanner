import { StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  hero: ViewStyle;
  toolbar: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {},
    hero: {
      marginBottom: theme.space[3],
    },
    toolbar: {
      marginBottom: theme.space[2],
    },
  });
  return styles;
}
