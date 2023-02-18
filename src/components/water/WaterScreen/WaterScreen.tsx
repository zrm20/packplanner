import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "../../../theme";

import { SafeAreaScreen } from "../../ui";
import WaterBottle from "../WaterBottle/WaterBottle";
import WaterItemsList from "../WaterItemsList/WaterItemsList";
import WaterStats from "../WaterStats/WaterStats";
import useStyles from "./WaterScreen.styles";

interface WaterScreenProps {

};

export default function WaterScreen(props: WaterScreenProps): JSX.Element {
  const styles = useStyles();
  const [fillLevel, setFillLevel] = useState<number>(100);
  const { colors } = useTheme();

  return (
    <SafeAreaScreen style={styles.container} >
      <View style={styles.topSection}>
        <View style={styles.waterBottleContainer}>
          <WaterBottle fillLevel={fillLevel} size={80} />
        </View>
        <WaterItemsList />
      </View>

      <View style={styles.sliderContainer}>
        <Text variant="titleMedium">Liquid Fill Level {fillLevel}%</Text>
        <Slider
          value={fillLevel}
          onValueChange={setFillLevel}
          minimumValue={0}
          maximumValue={100}
          step={1}
          style={styles.slider}
          minimumTrackTintColor={colors.secondary}
        />
      </View>

      <View style={styles.statsContainer}>
        <WaterStats fillLevel={fillLevel} />
      </View>
    </SafeAreaScreen>
  );
};
