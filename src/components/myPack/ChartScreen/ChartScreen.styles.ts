import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  title: TextStyle;
  chartContainer: ViewStyle;
  legendContainer: ViewStyle;
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
      },
      chartContainer: {
        width: '100%',
        alignItems: 'center'
      },
      legendContainer: {
        width: '100%',
        flex: 1,
        paddingHorizontal: theme.space[2],
        alignItems: 'center'
      }
    }
  );
  return styles;
};
