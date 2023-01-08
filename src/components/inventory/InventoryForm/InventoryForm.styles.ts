import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  scrollView: ViewStyle;
  liquidEnableSection: ViewStyle;
  enableLiquidLabel: TextStyle;
  liquidSection: ViewStyle;
  liquidTitle: TextStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        padding: theme.space[2],
        alignItems: 'center',
      },
      scrollView: {
        width: '100%',
      },
      liquidEnableSection: {
        marginBottom: theme.space[2],
        paddingHorizontal: theme.space[2],
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
      },
      enableLiquidLabel: {
        marginRight: theme.space[3]
      },
      liquidSection: {
        marginBottom: theme.space[2],
        padding: theme.space[2],
        marginHorizontal: theme.space[2]
      },
      liquidTitle: {
        textAlign: 'center'
      }
    }
  );
  return styles;
};
