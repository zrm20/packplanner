import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  title: TextStyle;
  form: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        alignItems: 'center',
        backgroundColor: theme.colors.background
      },
      title: {
        marginTop: theme.space[3],

      },
      form: {
        flex: 1,
        justifyContent: 'center'
      }
    }
  );
  return styles;
};
