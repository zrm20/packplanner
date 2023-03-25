import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  titleContainer: ViewStyle;
  closeButton: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        backgroundColor: theme.colors.background,
      },
      titleContainer: {
        padding: theme.space[2],
        marginTop: theme.space[2],
        alignItems: 'center',
        flexDirection: 'row'
      },
      closeButton: {
        marginRight: theme.space[3]
      }
    }
  );
  return styles;
};
