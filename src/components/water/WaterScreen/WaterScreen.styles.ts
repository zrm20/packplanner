import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  sliderContainer: ViewStyle;
  slider: ViewStyle;
  statsContainer: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {

      },
      sliderContainer: {
        width: '100%',
        padding: theme.space[3],
        alignItems: 'center'
      },
      slider: {
        width: '100%'
      },
      statsContainer: {
        width: '100%',
        padding: theme.space[2]
      }
    }
  );
  return styles;
};
