import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  title: TextStyle;
  listContainer: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
      },
      title: {
        marginTop: theme.space[2],
        textAlign: 'center',
        width: '100%'
      },
      listContainer: {
        width: '100%',
        paddingHorizontal: theme.space[2],
        flex: 1,
      }
    }
  );
  return styles;
};
