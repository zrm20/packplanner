import { StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  toolbar: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {},
    toolbar: {
      marginTop: theme.space[3],
      marginBottom: theme.space[2],
    },
  });
  return styles;
}
