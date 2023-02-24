import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  label: TextStyle;
  switch: ViewStyle;
};

export default function useStyles(row: boolean) {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        flexDirection: row ? "row" : "column",
        alignItems: 'center',
        justifyContent: 'center',
      },
      label: {
      },
      switch: {
        margin: theme.space[2]
      }
    }
  );
  return styles;
};
