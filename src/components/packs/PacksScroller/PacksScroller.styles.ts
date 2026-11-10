import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  toolbar: ViewStyle;
  packsContainer: ViewStyle;
  addButton: ViewStyle;
  emptyText: TextStyle;
  spinner: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      width: '100%',
      paddingHorizontal: theme.space[3],
      paddingTop: theme.space[2],
    },
    toolbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.space[2],
    },
    packsContainer: {
      width: '100%',
    },
    addButton: {
      margin: 0,
      borderColor: theme.colors.primary,
    },
    emptyText: {
      textAlign: 'center',
    },
    spinner: {
      marginTop: theme.space[3],
    },
  });
  return styles;
}
