import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  title: TextStyle;
  settingsContainer: ViewStyle;
  unitSelector: ViewStyle;
  userWidget: ViewStyle;
  copyright: TextStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        alignItems: 'center',
      },
      title: {

      },
      settingsContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.space[3],
      },
      unitSelector: {
        marginBottom: theme.space[3]
      },
      userWidget: {
        marginVertical: theme.space[4]
      },
      copyright: {
        marginTop: 'auto',
        marginBottom: theme.space[3]
      }
    }
  );
  return styles;
};
