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
        borderColor: theme.colors.outlineVariant,
        paddingVertical: 0
      },
      checkmark: {
        marginLeft: theme.space[2],
        justifyContent: 'center'
      }
    }
  );
  return styles;
};
