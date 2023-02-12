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
        backgroundColor: theme.colors.primary,
        color: theme.colors.onPrimary,
        textAlign: 'center'
      }
    }
  );
  return styles;
};
