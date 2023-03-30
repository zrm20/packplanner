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
      paddingHorizontal: theme.space[2],
      marginBottom: theme.space[4],
    },
    surface: {
      width: '100%',
      padding: theme.space[2],
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    switchGroup: {
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
