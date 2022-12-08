import { DefaultTheme } from "react-native-paper";
import brandColors from "./brandColors";

const theme = {
  ...DefaultTheme,
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    primary: brandColors.primary,
    secondary: brandColors.secondary
  }
};

export default theme;


