import React from "react";
import { Text } from "react-native-paper";

import { SafeAreaScreen } from "../../ui";
import WaterBottle from "../WaterBottle/WaterBottle";
import useStyles from "./WaterScreen.styles";

interface WaterScreenProps {

};

export default function WaterScreen(props: WaterScreenProps): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container} >
      <Text>Water Screen</Text>
      <WaterBottle fillLevel={100} />
    </SafeAreaScreen>
  );
};
