import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  toolbar: ViewStyle;
  packsContainer: ViewStyle;
  text: TextStyle;
  emptyText: TextStyle;
  spinner: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        width: '100%',
        padding: theme.space[2]
      },
      toolbar: {
        flexDirection: 'row',
        borderBottomWidth: theme.borderWeight[1],
        borderColor: theme.colors.secondary,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: theme.space[2],
      },
      packsContainer: {
        padding: theme.space[2],
        width: '100%',
      },
      text: {
        color: theme.colors.secondary
      },
      emptyText: {
        textAlign: 'center',
      },
      spinner: {
        marginTop: theme.space[3]
      }
    }
  );
  return styles;
};
