import { StyleSheet, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  toolbar: ViewStyle;
  iconGroup: ViewStyle;
  listContainer: ViewStyle;
  listSurface: ViewStyle;
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
      toolbar: {
        flexDirection: 'row',
        borderBottomWidth: theme.borderWeight[1],
        borderColor: theme.colors.secondary,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: theme.space[2],
      },
      iconGroup: {
        flexDirection: 'row',
      },
      listContainer: {
        marginTop: theme.space[2],
        flex: 1,
        width: '100%',
      },
      listSurface: {
        height: '100%',
      }
    }
  );
  return styles;
};
