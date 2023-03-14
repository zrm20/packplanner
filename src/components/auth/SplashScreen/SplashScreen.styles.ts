import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  bodyText: TextStyle;
  image: ImageStyle;
  button: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        width: '100%',
      },
      title: {
        textAlign: 'center',
        color: theme.colors.onPrimary
      },
      subtitle: {
        textAlign: 'center',
        marginBottom: theme.space[2],
        color: theme.colors.onPrimary
      },
      bodyText: {
        textAlign: 'center',
        color: theme.colors.onPrimary,
        width: '90%',
        marginBottom: theme.space[3]
      },
      image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginVertical: theme.space[3]
      },
      button: {
        backgroundColor: theme.colors.secondary,
        marginVertical: theme.space[2]
      }
    }
  );
  return styles;
};
