import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  scroll: ViewStyle;
  container: ViewStyle;
  chip: ViewStyle;
  chipLabel: TextStyle;
  dangerIcon: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    // The screen aligns children to the start, and web flex items refuse to be
    // narrower than their content. Without a stretched, shrinkable row the
    // chips widen the page and the PWA frame clips them instead of scrolling.
    scroll: {
      alignSelf: 'stretch',
      minWidth: 0,
    },
    container: {
      flexDirection: 'row',
      flexShrink: 0,
      alignItems: 'center',
      gap: theme.space[2],
      paddingHorizontal: theme.space[3],
    },
    chip: {
      flexShrink: 0,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.outline,
      borderRadius: 999,
    },
    chipLabel: {
      color: theme.colors.onSurface,
    },
    dangerIcon: {
      color: theme.colors.error,
    },
  });
  return styles;
}
