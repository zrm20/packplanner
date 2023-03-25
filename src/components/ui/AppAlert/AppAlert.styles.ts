import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  title: TextStyle;
  codeText: TextStyle;
  messageText: TextStyle;
  actionsContainer: ViewStyle;
  button: ViewStyle;
};

type ColorMap = {
  text: string,
  container: string,
};

export default function useStyles(alert: AlertNotification | null) {
  const theme = useTheme();

  function getColor(): ColorMap {
    switch(alert?.type) {
      case "info":  return {
        text: theme.colors.secondary,
        container: theme.colors.surface
      }
      case "error": return {
        text: theme.colors.error,
        container: theme.colors.errorContainer
      }
      case "warning": return {
        text: theme.colors.tertiary,
        container: theme.colors.tertiaryContainer
      }
      default: return {
        text: theme.colors.primary,
        container: theme.colors.surface
      }
    };
  };

  const typeColor = getColor();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        backgroundColor: typeColor.container,
        borderWidth: theme.borderWeight[3],
        borderColor: typeColor.text,
      },
      title: {
        color: typeColor.text,
        textAlign: 'center'
      },
      codeText: {
        textAlign: 'center',
        marginBottom: theme.space[2]
      },
      messageText: {
        textAlign: 'center'
      },
      actionsContainer: {
        justifyContent: 'space-evenly'
      },
      button: {
        color: typeColor.text
      }
    }
  );
  return styles;
};
