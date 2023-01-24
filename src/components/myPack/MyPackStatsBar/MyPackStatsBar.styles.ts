import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  surface: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        width: '100%',
        paddingHorizontal: theme.space[2]
      },
      surface: {
        width: '100%',
        padding: theme.space[2],
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      }
    }
  );
  return styles;
};
