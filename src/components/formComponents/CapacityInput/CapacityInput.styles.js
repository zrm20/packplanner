import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper"

export default function useStyles(props) {
  const theme = useTheme();

  const styles = StyleSheet.create(
    {
      container: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: theme.space,
        alignItems: 'center'
      },
      input: {
        flex: 1
      },
      toggleGroup: {
        marginLeft: theme.space[3]
      }
    }
  );
  return styles;
};
