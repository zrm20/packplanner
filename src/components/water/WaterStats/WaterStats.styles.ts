import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  gridItem: ViewStyle;
  catHeader: TextStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row'
      },
      gridItem: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.space[1]
      },
      catHeader: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '500',
        backgroundColor: theme.colors.secondary,
        color: theme.colors.onSecondary,
        padding: theme.space[1]
      }
    }
  );
  return styles;
};
