import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper"

export default function useStyles(props) {
  const theme = useTheme();

  const styles = StyleSheet.create(
    {
      container: {
        width: '100%',
        marginBottom: theme.space[2],
        paddingHorizontal: theme.space[3]
      }
    }
  );
  return styles;
};
