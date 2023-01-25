import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  title: TextStyle;
  settingsContainer: ViewStyle;
  unitSelector: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        alignItems: 'center'
      },
      title: {

      },
      settingsContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.space[3]
      },
      unitSelector: {
        width: '100%',
        alignItems: 'center',
        marginBottom: theme.space[3]
      }
    }
  );
  return styles;
};
