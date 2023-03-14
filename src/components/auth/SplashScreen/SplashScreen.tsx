import React from "react";
import { Text } from "react-native-paper";
import { SafeAreaScreen } from "../../ui";

import useStyles from "./SplashScreen.styles";

interface SplashScreenProps {

};

export default function SplashScreen(props: SplashScreenProps): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container} >
      <Text>Splash</Text>
    </SafeAreaScreen>
  );
};
