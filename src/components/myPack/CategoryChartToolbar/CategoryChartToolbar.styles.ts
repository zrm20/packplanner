import { StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  surface: ViewStyle;
  row: ViewStyle;
  switchGroup: ViewStyle;
  sliderGroup: ViewStyle;
  slider: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      width: '100%',
      marginBottom: theme.space[2],
    },
    surface: {
      width: '100%',
      padding: theme.space[3],
      borderRadius: theme.roundness * 4,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surface,
    },
    row: {
      gap: theme.space[2],
    },
    switchGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sliderGroup: {
      width: '100%',
      marginTop: theme.space[2],
      alignItems: 'center',
    },
    slider: {
      width: '100%',
    },
  });
  return styles;
}
