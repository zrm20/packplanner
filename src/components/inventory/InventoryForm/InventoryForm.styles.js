import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper"

export default function useStyles(props) {
  const theme = useTheme();

  const styles = StyleSheet.create(
    {
      container: {
        padding: theme.space[2],
        height: '100%',
        alignItems: 'center',
      },
      scrollView: {
        width: '100%'
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
