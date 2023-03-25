import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  closeButton: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
      },
      closeButton: {
        marginRight: theme.space[3]
      }
    }
  );
  return styles;
};
