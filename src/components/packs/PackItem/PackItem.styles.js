import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper"

export default function useStyles(props) {
  const theme = useTheme();

  const styles = StyleSheet.create(
    {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.space[2],
        borderRadius: 10,
        margin: theme.space[1],
        width: 100
      },
      title: {
        flexWrap: 'wrap'
      }
    }
  );
  return styles;
};
