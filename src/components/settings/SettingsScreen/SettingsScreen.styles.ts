import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  scroll: ViewStyle;
  content: ViewStyle;
  settingsContainer: ViewStyle;
  userWidget: ViewStyle;
  copyright: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      minHeight: 0,
      width: '100%',
    },
    scroll: {
      flex: 1,
      minHeight: 0,
      width: '100%',
    },
    content: {
      paddingHorizontal: theme.space[3],
      paddingBottom: theme.space[3],
      gap: theme.space[3],
    },
    settingsContainer: {
      width: '100%',
      gap: theme.space[3],
      backgroundColor: theme.colors.surface,
      borderWidth: theme.borderWeight[1],
      borderColor: theme.colors.outlineVariant,
      borderRadius: 14,
      padding: theme.space[3],
    },
    userWidget: {
      padding: 0,
    },
    copyright: {
      textAlign: 'center',
      color: theme.colors.onSurfaceVariant,
      marginBottom: theme.space[3],
    },
  });
  return styles;
}
