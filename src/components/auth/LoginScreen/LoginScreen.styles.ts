import { StyleSheet, ViewStyle } from 'react-native';

interface Style {
  container: ViewStyle;
  form: ViewStyle;
}

export default function useStyles() {
  const styles = StyleSheet.create<Style>({
    container: {
      alignItems: 'center',
    },
    form: {
      flex: 1,
      justifyContent: 'center',
    },
  });
  return styles;
}
