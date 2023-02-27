import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
};

export default function useStyles(show: boolean) {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: theme.colors.backdrop,
        display: show ? "flex" : "none"
      }
    }
  );
  return styles;
};
