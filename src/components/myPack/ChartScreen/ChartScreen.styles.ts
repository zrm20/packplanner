import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  title: TextStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {

      },
      title: {
        width: "100%",
        textAlign: "center"
      }
    }
  );
  return styles;
};
