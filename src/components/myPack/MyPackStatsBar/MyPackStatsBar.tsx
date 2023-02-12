import React from "react";
import { View, ViewStyle } from "react-native";
import { Surface, Text } from "react-native-paper";

import { useInventory, usePacks, useSettings } from "../../../hooks";
import useStyles from "./MyPackStatsBar.styles";

interface MyPackStatsBarProps {
  style?: ViewStyle;
};

export default function MyPackStatsBar(props: MyPackStatsBarProps): JSX.Element {
  const styles = useStyles();
  const { weightUnit } = useSettings();
  const { getTotalWeightInPack, getLiquidWeightInPack, getBaseWeightInPack } = useInventory();
  const { selectedPack } = usePacks();

  // numbers for pack weight and item weight in kg
  const packWeight: number = selectedPack?.weight || 0;
  const totalItemWeightInPack: number = getTotalWeightInPack();
  const baseWeightInPack: number = getBaseWeightInPack();

  // weight totals in kg
  const baseWeight: number = packWeight + baseWeightInPack;
  const totalWeightKg: number = packWeight + totalItemWeightInPack;
  const totalWeightWithLiquid: number = totalWeightKg + getLiquidWeightInPack()

  // converted totals to the current weight unit
  const convertedBaseWeight = Math.round(weightUnit.convert(baseWeight) * 100) / 100;
  const convertedTotalWeight = Math.round(weightUnit.convert(totalWeightKg) * 100) / 100;
  const convertedTotalWeightWithLiquid = Math.round(weightUnit.convert(totalWeightWithLiquid) * 100) / 100;

  return (
    <View style={[styles.container, props.style]} >
      <Surface style={styles.surface}>
        <View style={styles.dataContainer} >
          <Text variant="labelLarge">Base Weight:</Text>
          <Text variant="titleMedium">{convertedBaseWeight} {weightUnit.label}</Text>
        </View>
        <View style={[styles.dataContainer, styles.centerData]} >
          <Text variant="labelLarge">Total Weight:</Text>
          <Text variant="titleMedium">{convertedTotalWeight} {weightUnit.label}</Text>
        </View>
        <View style={styles.dataContainer} >
          <Text variant="labelLarge">Total w/Liquid:</Text>
          <Text variant="titleMedium">{convertedTotalWeightWithLiquid} {weightUnit.label}</Text>
        </View>
      </Surface>
    </View>
  );
};
