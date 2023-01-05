import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper"

export default function useStyles(props) {
  const theme = useTheme();

  const styles = StyleSheet.create(
    {
      container: {
        width: '100%',
        padding: theme.space[2],
        flex: 1,
      },
      toolbar: {
        flexDirection: 'row',
        borderBottomWidth: theme.borderWeight[1],
        borderColor: theme.colors.secondary,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: theme.space[2],
      },
      iconGroup: {
        flexDirection: 'row',
      },
      listContainer: {
        marginTop: theme.space[2],
        flex: 1,
        width: '100%',
      },
      listSurface: {
        height: '100%',
      }
    }
  );
  return styles;
};
