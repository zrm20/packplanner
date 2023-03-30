import { StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  surface: ViewStyle;
  dataContainer: ViewStyle;
  centerData: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      width: '100%',
      paddingHorizontal: theme.space[2],
    },
    surface: {
      width: '100%',
      padding: theme.space[1],
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
    },
    dataContainer: {
      alignItems: 'center',
    },
    centerData: {
      borderLeftWidth: theme.borderWeight[1],
      borderRightWidth: theme.borderWeight[1],
      paddingHorizontal: theme.space[2],
      borderColor: theme.colors.outline,
    },
  });
  return styles;
}
