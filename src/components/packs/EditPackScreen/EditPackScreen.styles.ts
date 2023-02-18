import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  titleContainer: ViewStyle;
  deleteContainer: ViewStyle;
  deleteButton: ViewStyle;
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
        alignItems: 'center'
      },
      deleteContainer: {
        width: '100%',
        marginTop: theme.space[2],
        alignItems: 'center',
      },
      deleteButton: {
        backgroundColor: theme.colors.error
      }
    }
  );
  return styles;
};
