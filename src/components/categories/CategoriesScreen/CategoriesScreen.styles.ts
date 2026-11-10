import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  screen: ViewStyle;
  container: ViewStyle;
  toolbar: ViewStyle;
  addButton: ViewStyle;
  card: ViewStyle;
  spinner: ViewStyle;
  list: ViewStyle;
  row: ViewStyle;
  firstRow: ViewStyle;
  icon: ViewStyle;
  iconGlyph: TextStyle;
  text: ViewStyle;
  name: TextStyle;
  exempt: TextStyle;
  stock: ViewStyle;
  stockLabel: TextStyle;
  chevron: TextStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    screen: {
      minHeight: 0,
      alignSelf: 'stretch',
      width: '100%',
    },
    container: {
      alignSelf: 'stretch',
      width: '100%',
      flex: 1,
      minHeight: 0,
      paddingHorizontal: theme.space[3],
      paddingBottom: theme.space[3],
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
    card: {
      flex: 1,
      minHeight: 0,
      backgroundColor: theme.colors.surface,
      borderWidth: theme.borderWeight[1],
      borderColor: theme.colors.outlineVariant,
      borderRadius: 14,
      overflow: 'hidden',
    },
    spinner: {
      marginTop: theme.space[4],
    },
    list: {
      flex: 1,
      minHeight: 0,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[2] + 4,
      paddingVertical: theme.space[2] + 3,
      paddingHorizontal: theme.space[2] + 4,
      borderTopWidth: theme.borderWeight[1],
      borderTopColor: theme.colors.elevation.level3,
    },
    firstRow: {
      borderTopWidth: 0,
    },
    icon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconGlyph: {
      color: theme.colors.surface,
    },
    text: {
      flex: 1,
      minWidth: 0,
    },
    name: {
      fontWeight: '600',
    },
    exempt: {
      color: theme.colors.onSurfaceVariant,
    },
    stock: {
      borderWidth: theme.borderWeight[1],
      borderColor: theme.colors.secondary,
      borderRadius: 999,
      paddingHorizontal: theme.space[2],
      paddingVertical: theme.space[1],
    },
    stockLabel: {
      color: theme.colors.secondary,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    chevron: {
      color: theme.colors.onSurfaceVariant,
    },
  });
  return styles;
}
