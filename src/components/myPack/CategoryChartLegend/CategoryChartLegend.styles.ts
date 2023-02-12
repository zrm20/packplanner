import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  legendItem: ViewStyle;
  legendItemColor: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {

      },
      legendItem: {
        flexWrap: "wrap",
        flexDirection: 'row',
        marginBottom: theme.space[1]
      },
      legendItemColor: {
        width: 40,
        height: 25,
        borderRadius: theme.roundness * 5,
        marginRight: theme.space[2]
      }
    }
  );
  return styles;
};
