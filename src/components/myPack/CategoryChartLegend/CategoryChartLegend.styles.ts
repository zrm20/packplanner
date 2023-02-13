import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  legendItem: ViewStyle;
  legendItemColor: ViewStyle;
  scrollView: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      scrollView: {
        width: '100%'
      },
      container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
      legendItem: {
        width: '50%',
        flexDirection: 'row',
        marginBottom: theme.space[1]
      },
      legendItemColor: {
        width: 25,
        height: 25,
        borderRadius: theme.roundness * 5,
        marginRight: theme.space[2]
      }
    }
  );
  return styles;
};
