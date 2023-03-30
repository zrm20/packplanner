import { StyleSheet, ViewStyle } from 'react-native';

interface Style {
  container: ViewStyle;
}

export default function useStyles() {
  const styles = StyleSheet.create<Style>({
    container: {
      width: '100%',
      alignItems: 'center',
    },
  });
  return styles;
}
