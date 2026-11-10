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
    // Stay the height of the chips. A ScrollView otherwise grows into empty
    // space and shrinks away once the pack list needs the room. minWidth 0
    // keeps the row screen-width on web so the chips scroll instead of clipping.
    scroll: {
      alignSelf: 'stretch',
      flexGrow: 0,
      flexShrink: 0,
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
