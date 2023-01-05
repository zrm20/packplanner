import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper"

export default function useStyles(props) {
  const theme = useTheme();

  const styles = StyleSheet.create(
    {
      container: {
        borderBottomWidth: theme.borderWeight[1],
        borderColor: theme.colors.outlineVariant
      },
      checkmark: {
        marginLeft: theme.space[1]
      }
    }
  );
  return styles;
};
