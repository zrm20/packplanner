import { StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  toolbar: ViewStyle;
  addButton: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      width: '100%',
      flex: 1,
      minHeight: 0,
    },
    toolbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.space[3],
      paddingTop: theme.space[3],
      marginBottom: theme.space[2],
    },
    addButton: {
      margin: 0,
      borderColor: theme.colors.primary,
    },
  });
  return styles;
}
