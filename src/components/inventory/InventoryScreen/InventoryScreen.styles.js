import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper"

export default function useStyles(props) {
  const theme = useTheme();

  const styles = StyleSheet.create(
    {
      container: {
      }
    }
  );
  return styles;
};
