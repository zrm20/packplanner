import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  title: TextStyle;
  listContainer: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {

      },
      title: {
        width: '100%',
        marginTop: theme.space[2],
        textAlign: "center"
      },
      listContainer: {
        width: '100%',
        paddingHorizontal: theme.space[2]
      }
    }
  );
  return styles;
};
