import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "../../../theme";

export default function useStyles() {
  const theme = useTheme()

  type Style = {
    container: ViewStyle,
    title: TextStyle,
    selectedPack: ViewStyle
  };

  const styles = StyleSheet.create<Style>(
    {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.space[2],
        borderRadius: 10,
        margin: theme.space[1],
        width: 100
      },
      title: {
        flexWrap: 'wrap'
      },
      selectedPack: {
        borderWidth: 2,
        borderColor: theme.colors.primary
      }
    }
  );
  return styles;
};
