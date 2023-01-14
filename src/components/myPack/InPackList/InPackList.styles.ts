import { StyleSheet, ViewStyle, Animated, StyleProp } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  listContainer: ViewStyle;
  li: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        padding: theme.space[2],
        width: '100%',
      },
      listContainer: {
        marginTop: theme.space[2],
        width: '100%',
      },
      li: {
        padding: 0
      }
    }
  );

  return  styles;
};
