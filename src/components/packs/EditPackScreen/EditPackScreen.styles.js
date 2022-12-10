import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper"

export default function useStyles(props) {
  const theme = useTheme();

  const styles = StyleSheet.create(
    {
      container: {
        backgroundColor: theme.colors.background,
      },
      titleContainer: {
        padding: theme.space[2],
        marginTop: theme.space[2],
        alignItems: 'center'
      },
      closeButton: {
        position: 'absolute',
        left: theme.space[2],
        top: theme.space[2],
      },
      deleteContainer: {
        width: '100%',
        marginTop: theme.space[2],
        alignItems: 'center',
      },
      deleteButton: {
        backgroundColor: theme.colors.error
      }
    }
  );
  return styles;
};
