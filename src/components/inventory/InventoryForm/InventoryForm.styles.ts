import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { useTheme } from "../../../theme";

interface Style {
  container: ViewStyle;
  scrollView: ViewStyle;
  liquidEnableSection: ViewStyle;
  enableLiquidLabel: TextStyle;
  liquidSection: ViewStyle;
  liquidTitle: TextStyle;
  fabs: ViewStyle;
  saveButton: ViewStyle;
  deleteButton: ViewStyle;
};

export default function useStyles() {
  const theme = useTheme();

  const styles = StyleSheet.create<Style>(
    {
      container: {
        padding: theme.space[2],
        alignItems: 'center',
        width: '100%',
        flex: 1
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
      },
      fabs: {
        // handles both floating buttons at bottom of form
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: theme.space[2],
      },
      saveButton: {
        left: theme.space[4]
      },
      deleteButton: {
        right: theme.space[4],
        backgroundColor: theme.colors.errorContainer
      }
    }
  );
  return styles;
};
