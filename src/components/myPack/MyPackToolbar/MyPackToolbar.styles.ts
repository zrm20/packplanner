import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-evenly',
        paddingVertical: theme.space[1],
        borderTopWidth: theme.borderWeight[1],
        borderBottomWidth: theme.borderWeight[1],
        borderColor: theme.colors.tertiary
      }
    }
  );
  return styles;
};
