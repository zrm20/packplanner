import { StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '../../../theme';

interface Style {
  container: ViewStyle;
  bottleOutline: ViewStyle;
  cap: ViewStyle;
  fill: ViewStyle;
}

export default function useStyles(fillLevel: number, size: number) {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>({
    container: {
      alignItems: 'center',
      padding: theme.space[1],
    },
    bottleOutline: {
      borderWidth: theme.borderWeight[3],
      borderColor: theme.colors.primary,
      borderRadius: size / 10,
      width: size,
      height: size * 2.5,
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
    cap: {
      borderWidth: theme.borderWeight[1],
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary,
      borderTopRightRadius: size / 25,
      borderTopLeftRadius: size / 25,
      width: size / 3,
      height: size / 4,
    },
    fill: {
      width: '100%',
      height: `${fillLevel}%`,
      backgroundColor: '#00ffff',
    },
  });
  return styles;
}
