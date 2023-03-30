import { StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  flatListContent: ViewStyle;
  searchBar: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    flatListContent: {},
    searchBar: {
      width: '100%',
      marginBottom: theme.space[2],
    },
  });
  return styles;
}
