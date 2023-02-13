import React from "react";
import { View } from "react-native";
import { Surface, Switch, Text } from "react-native-paper";
import Slider from "@react-native-community/slider";

import { useChartContext } from "../../../hooks";
import useStyles from "./CategoryChartToolbar.styles";
import { useTheme } from "../../../theme";

interface CategoryChartToolbarProps {

};

export default function CategoryChartToolbar(props: CategoryChartToolbarProps): JSX.Element {
  const styles = useStyles();
  const { colors } = useTheme();
  const {
    baseWeightOnly,
    setBaseWeightOnly,
    hideLiquidWeight,
    setHideLiquidWeight,
    liquidLevel,
    setLiquidLevel
  } = useChartContext();

  return (
    <View style={styles.container} >
      <Surface style={styles.surface}>
        <View style={styles.row}>
          <View style={styles.switchGroup}>
            <Text variant="labelMedium">Base Weight Only</Text>
            <Switch value={baseWeightOnly} onValueChange={setBaseWeightOnly} />
          </View>
          <View style={styles.switchGroup}>
            <Text variant="labelMedium">Hide Liquid Weight</Text>
            <Switch value={hideLiquidWeight} onValueChange={setHideLiquidWeight} />
          </View>
        </View>

        <View style={styles.sliderGroup}>
          <Text variant="labelMedium">Hide Liquid Weight</Text>
          <Slider
            style={styles.slider}
            value={liquidLevel}
            onValueChange={setLiquidLevel}
            step={1}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={colors.secondary}
          />
        </View>
      </Surface>
    </View>
  );
};
