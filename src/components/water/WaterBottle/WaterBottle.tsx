import React from "react";
import { View } from "react-native";

import useStyles from "./WaterBottle.styles";

interface WaterBottleProps {
  fillLevel: number;
  size?: number
};

export default function WaterBottle(props: WaterBottleProps): JSX.Element {
  const { size = 100, fillLevel } = props;
  const styles = useStyles(fillLevel, size);

  return (
    <View style={styles.container} >

      <View style={styles.cap} />
      <View style={styles.bottleOutline} >
        <View style={styles.fill} />
      </View>
    </View>
  );
};
