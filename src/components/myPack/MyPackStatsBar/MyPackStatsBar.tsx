import React from "react";
import { View, ViewStyle } from "react-native";
import { Surface, Text } from "react-native-paper";

import { useInventory, usePacks, useSettings } from "../../../hooks";
import { weightMap } from "../../../constants";
import useStyles from "./MyPackStatsBar.styles";

interface MyPackStatsBarProps {
  style?: ViewStyle;
};

export default function MyPackStatsBar(props: MyPackStatsBarProps): JSX.Element {
  const styles = useStyles();
  const { weightUnits } = useSettings();
  const { getTotalWeightInPack, getLiquidWeightInPack } = useInventory();
  const { selectedPack } = usePacks();

  const currentWeightUnit = weightMap[weightUnits];

  // numbers for pack weight and item weight in kg
  const packWeight: number = selectedPack?.weight || 0;
  const totalItemWeightInPack: number = getTotalWeightInPack();

  // weight totals in kg
  const totalWeightKg: number = packWeight + totalItemWeightInPack;
  const totalWeightWithLiquid: number = totalWeightKg + getLiquidWeightInPack()

  // converted totals to the current weight unit
  const convertedTotalWeight = Math.round(currentWeightUnit.convert(totalWeightKg) * 100) / 100;
  const convertedTotalWeightWithLiquid = Math.round(currentWeightUnit.convert(totalWeightWithLiquid) * 100) / 100;

  return (
    <View style={[styles.container, props.style]} >
      <Surface style={styles.surface}>
        <View style={styles.dataContainer} >
          <Text variant="labelLarge">Total Weight:</Text>
          <Text variant="titleMedium">{convertedTotalWeight} {currentWeightUnit.label}</Text>
        </View>
        <View style={[styles.dataContainer, styles.centerData]} >
          <Text variant="labelLarge">Total Weight:</Text>
          <Text variant="titleMedium">{convertedTotalWeight} {currentWeightUnit.label}</Text>
        </View>
        <View style={styles.dataContainer} >
          <Text variant="labelLarge">Total w/Liquid:</Text>
          <Text variant="titleMedium">{convertedTotalWeightWithLiquid} {currentWeightUnit.label}</Text>
        </View>
      </Surface>
    </View>
  );
};
