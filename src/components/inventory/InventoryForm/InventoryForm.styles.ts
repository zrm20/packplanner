import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  liquidEnableSection: ViewStyle;
  enableLiquidLabel: TextStyle;
  liquidSection: ViewStyle;
  liquidTitle: TextStyle;
  actionButtons: ViewStyle;
  deleteButton: ViewStyle;
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
    liquidEnableSection: {
      marginBottom: theme.space[2],
      paddingHorizontal: theme.space[2],
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    enableLiquidLabel: {
      marginRight: theme.space[3],
    },
    liquidSection: {
      marginBottom: theme.space[2],
      padding: theme.space[2],
      marginHorizontal: theme.space[2],
    },
    liquidTitle: {
      textAlign: 'center',
    },
    actionButtons: {
      marginVertical: theme.space[1],
    },
    deleteButton: {
      backgroundColor: theme.colors.error,
    },
  });
  return styles;
}
