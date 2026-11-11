import { StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  toolbar: ViewStyle;
  addButton: ViewStyle;
  listContainer: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      width: '100%',
      paddingHorizontal: theme.space[3],
      paddingTop: theme.space[3],
      flex: 1,
    },
    toolbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.space[2],
    },
    addButton: {
      margin: 0,
      borderColor: theme.colors.primary,
    },
    listContainer: {
      flex: 1,
      width: '100%',
    },
  });
  return styles;
}
