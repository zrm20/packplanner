import { StyleSheet, TextStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  catHeader: TextStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      catHeader: {
        backgroundColor: theme.colors.secondary,
        color: theme.colors.onSecondary,
        textAlign: 'center'
      }
    }
  );
  return styles;
};
