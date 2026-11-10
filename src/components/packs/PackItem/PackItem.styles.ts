import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

export default function useStyles() {
  const theme = useTheme();

  type Style = {
    container: ViewStyle;
    unselectedPack: ViewStyle;
    selectedPack: ViewStyle;
    iconTile: ViewStyle;
    selectedIconTile: ViewStyle;
    icon: TextStyle;
    selectedIcon: TextStyle;
    check: ViewStyle;
    checkIcon: TextStyle;
    brand: TextStyle;
    model: TextStyle;
    meta: TextStyle;
  };

  const styles = StyleSheet.create<Style>({
    container: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: theme.space[2] + 4,
      borderRadius: 14,
      margin: theme.space[1],
      width: 140,
      backgroundColor: theme.colors.surface,
      elevation: 0,
      shadowOpacity: 0,
    },
    unselectedPack: {
      borderWidth: theme.borderWeight[1],
      borderColor: theme.colors.outlineVariant,
    },
    selectedPack: {
      borderWidth: theme.borderWeight[2],
      borderColor: theme.colors.primary,
      padding: theme.space[2] + 3,
    },
    iconTile: {
      width: 34,
      height: 34,
      borderRadius: 10,
      backgroundColor: theme.colors.primaryContainer,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.space[2] + 2,
    },
    selectedIconTile: {
      backgroundColor: theme.colors.primary,
    },
    icon: {
      color: theme.colors.primary,
    },
    selectedIcon: {
      color: theme.colors.onPrimary,
    },
    check: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    checkIcon: {
      color: theme.colors.tertiary,
    },
    brand: {
      fontWeight: '600',
      lineHeight: 18,
    },
    model: {
      color: theme.colors.onSurfaceVariant,
    },
    meta: {
      color: theme.colors.onSurfaceVariant,
      marginTop: theme.space[2],
    },
  });
  return styles;
}
