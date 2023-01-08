import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  checkmark: ViewStyle
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        borderBottomWidth: theme.borderWeight[1],
        borderColor: theme.colors.outlineVariant
      },
      checkmark: {
        marginLeft: theme.space[1]
      }
    }
  );
  return styles;
};
