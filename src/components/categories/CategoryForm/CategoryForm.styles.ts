import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  baseWeightContainer: ViewStyle;
  iconContainer: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        width: '100%',
        flex: 1,
        padding: theme.space[2]
      },
      baseWeightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      },
      iconContainer: {
        flex: 1,
        marginBottom: theme.space[2]
      }
    }
  );
  return styles;
};
