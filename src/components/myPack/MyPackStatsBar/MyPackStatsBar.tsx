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
  const { weightUnit } = useSettings();
  const { getTotalWeightInPack, getLiquidWeightInPack } = useInventory();
  const { selectedPack } = usePacks();

  // numbers for pack weight and item weight in kg
  const packWeight: number = selectedPack?.weight || 0;
  const totalItemWeightInPack: number = getTotalWeightInPack();

  // weight totals in kg
  const totalWeightKg: number = packWeight + totalItemWeightInPack;
  const totalWeightWithLiquid: number = totalWeightKg + getLiquidWeightInPack()

  // converted totals to the current weight unit
  const convertedTotalWeight = Math.round(weightUnit.convert(totalWeightKg) * 100) / 100;
  const convertedTotalWeightWithLiquid = Math.round(weightUnit.convert(totalWeightWithLiquid) * 100) / 100;

  return (
    <View style={[styles.container, props.style]} >
      <Surface style={styles.surface}>
        <View style={styles.dataContainer} >
          <Text variant="labelLarge">Total Weight:</Text>
          <Text variant="titleMedium">{convertedTotalWeight} {weightUnit.label}</Text>
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
