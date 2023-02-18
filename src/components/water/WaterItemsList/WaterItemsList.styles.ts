import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  surface: ViewStyle;
  title: TextStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        flex: 1,
        marginHorizontal: theme.space[2]
      },
      surface: {
        padding: theme.space[2],
      },
      title: {
        marginBottom: theme.space[2],
        fontWeight: 'bold'
      }
    }
  );
  return styles;
};
