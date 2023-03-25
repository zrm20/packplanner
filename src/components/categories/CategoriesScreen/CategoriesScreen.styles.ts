import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  titleContainer: ViewStyle;
  listItem: ViewStyle;
  listContainer: ViewStyle;
  surface: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        width: '100%',
        padding: theme.space[2],
        flex: 1,
      },
      titleContainer: {
        flexDirection: 'row',
        borderBottomWidth: theme.borderWeight[1],
        borderColor: theme.colors.secondary,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: theme.space[2],
      },
      listContainer: {
        flex: 1,
        padding: theme.space[2],
      },
      listItem: {
        width: '100%',
        borderColor: theme.colors.outlineVariant,
        borderBottomWidth: theme.borderWeight[1]
      },
      surface: {
        padding: theme.space[2],
        width: '100%',
        height: '100%',
        justifyContent: 'center'
      }
    }
  );
  return styles;
};
