import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  toolbar: ViewStyle;
  meta: TextStyle;
  emptyText: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      paddingHorizontal: theme.space[3],
      width: '100%',
    },
    toolbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.space[2],
      marginTop: theme.space[2],
    },
    meta: {
      color: theme.colors.onSurfaceVariant,
    },
    emptyText: {
      textAlign: 'center',
      width: '100%',
      color: theme.colors.onSurfaceVariant,
      marginTop: theme.space[3],
    },
  });

  return styles;
}
