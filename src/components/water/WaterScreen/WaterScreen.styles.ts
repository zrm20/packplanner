import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  sliderContainer: ViewStyle;
  slider: ViewStyle;
  statsContainer: ViewStyle;
  topSection: ViewStyle;
  waterBottleContainer: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {

      },
      topSection: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        padding: theme.space[2],
        alignItems: 'center',
      },
      waterBottleContainer: {
        marginHorizontal: theme.space[3]
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
