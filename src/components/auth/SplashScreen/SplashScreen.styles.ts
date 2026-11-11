import chroma from 'chroma-js';
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  scroll: ViewStyle;
  content: ViewStyle;
  actions: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  bodyText: TextStyle;
  image: ImageStyle;
  button: ViewStyle;
  backdrop: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      minHeight: 0,
      backgroundColor: theme.colors.background,
      width: '100%',
    },
    scroll: {
      flex: 1,
      width: '100%',
    },
    content: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.space[3],
    },
    actions: {
      width: '100%',
      maxWidth: 360,
    },
    title: {
      textAlign: 'center',
      color: theme.colors.onBackground,
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: theme.space[2],
      color: theme.colors.onBackground,
    },
    bodyText: {
      textAlign: 'center',
      color: theme.colors.onBackground,
      width: '90%',
      marginBottom: theme.space[3],
    },
    image: {
      width: 150,
      height: 150,
      marginVertical: theme.space[3],
    },
    button: {
      backgroundColor: theme.colors.primary,
      marginVertical: theme.space[2],
    },
    backdrop: {
      backgroundColor: chroma(theme.colors.surface).alpha(0.5).hex(),
    },
  });
  return styles;
}
