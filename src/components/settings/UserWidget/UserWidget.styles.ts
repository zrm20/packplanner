import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  authSurface: ViewStyle;
  buttonGroup: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {

      container: {
        padding: theme.space[2],
        width: '100%'
      },
      authSurface: {
        padding: theme.space[2],
        alignItems: 'center'
      },
      buttonGroup: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: theme.space[2]
      }
    }
  );
  return styles;
};
