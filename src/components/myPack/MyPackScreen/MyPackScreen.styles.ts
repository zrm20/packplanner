import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme"

interface Style {
  container: ViewStyle;
  header: ViewStyle,
  stats: ViewStyle;
  toolbar: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {

      },
      header: {
        marginBottom: theme.space[2]
      },
      stats: {
        marginBottom: theme.space[2]
      },
      toolbar: {
        marginBottom: theme.space[2]
      }
    }
  );
  return styles;
};
