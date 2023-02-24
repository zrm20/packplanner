import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  errorContainer: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
      },
      errorContainer: {
        width: '100%',
        flex: 1,
        padding: theme.space[2],
        alignItems: 'center',
        justifyContent: 'center'
      }

    }
  );
  return styles;
};
