import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  screen: ViewStyle;
  scroll: ViewStyle;
  content: ViewStyle;
  containersCard: ViewStyle;
  fillCard: ViewStyle;
  fillLabelRow: ViewStyle;
  fillLabel: TextStyle;
  slider: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const card: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderWidth: theme.borderWeight[1],
    borderColor: theme.colors.outlineVariant,
    borderRadius: 14,
    overflow: 'hidden',
  };

  const styles = StyleSheet.create<Style>({
    screen: {
      minHeight: 0,
      alignSelf: 'stretch',
      width: '100%',
    },
    scroll: {
      alignSelf: 'stretch',
      flex: 1,
      minHeight: 0,
      width: '100%',
    },
    content: {
      paddingHorizontal: theme.space[3],
      paddingBottom: theme.space[3],
      gap: theme.space[3],
    },
    containersCard: {
      ...card,
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.space[3],
      gap: theme.space[3],
    },
    fillCard: {
      ...card,
      padding: theme.space[3],
    },
    fillLabelRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: theme.space[1],
    },
    fillLabel: {
      color: theme.colors.onSurfaceVariant,
    },
    slider: {
      width: '100%',
    },
  });
  return styles;
}
