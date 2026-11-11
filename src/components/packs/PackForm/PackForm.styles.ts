import { StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      width: '100%',
      paddingVertical: theme.space[3],
      backgroundColor: theme.colors.surface,
      borderRadius: theme.roundness * 4,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
    },
  });
  return styles;
}
