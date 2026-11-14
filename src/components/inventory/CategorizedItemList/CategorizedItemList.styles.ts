import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  catHeader: ViewStyle;
  catIcon: ViewStyle;
  catIconGlyph: TextStyle;
  catLabel: TextStyle;
  catMeta: TextStyle;
  list: ViewStyle;
  card: ViewStyle;
  group: ViewStyle;
  groupSpacing: ViewStyle;
  firstRowNoBorder: ViewStyle;
}

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    catHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[2],
      marginHorizontal: theme.space[1] / 2,
      marginBottom: theme.space[2],
    },
    catIcon: {
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    catIconGlyph: {
      color: theme.colors.surface,
    },
    catLabel: {
      flex: 1,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      fontWeight: '600',
      color: theme.colors.onSurfaceVariant,
    },
    catMeta: {
      color: theme.colors.onSurfaceVariant,
      fontWeight: '500',
    },
    list: {
      flex: 1,
      minHeight: 0,
      width: '100%',
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderWidth: theme.borderWeight[1],
      borderColor: theme.colors.outlineVariant,
      borderRadius: 14,
      overflow: 'hidden',
    },
    groupSpacing: {
      marginTop: theme.space[3],
    },
    group: {
      paddingHorizontal: theme.space[3],
    },
    firstRowNoBorder: {
      borderTopWidth: 0,
    },
  });
  return styles;
}
