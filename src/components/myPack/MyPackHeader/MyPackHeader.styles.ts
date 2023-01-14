import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  dataContainer: ViewStyle;
  emptyText: TextStyle;
  emptyContainer: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        flexDirection: "row",
        paddingHorizontal: theme.space[3],
      },
      dataContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-evenly'
      },
      emptyText: {
        textAlign: "center"
      },
      emptyContainer: {
        width: "100%",
        paddingHorizontal: theme.space[3],
      }
    }
);
  return  styles;
};
