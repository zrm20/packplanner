import { StyleSheet, ViewStyle } from 'react-native';

interface Style {
  container: ViewStyle;
  button: ViewStyle;
}

export default function useStyles() {
  const styles = StyleSheet.create<Style>({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {},
  });
  return styles;
}
