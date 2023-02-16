import React from "react";
import { View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { useInventory, usePacks, useSettings } from "../../../hooks";

import useStyles from "./WaterStats.styles";

interface WaterStatsProps {
  fillLevel: number;
};

export default function WaterStats(props: WaterStatsProps): JSX.Element {
  const styles = useStyles();
  const { fillLevel } = props;
  const { getLiquidCapacityInPack, getLiquidWeightInPack, getTotalWeightInPack } = useInventory();
  const { selectedPack } = usePacks();
  const { liquidUnit, weightUnit } = useSettings();

  function round(value: number): number {
    return Math.round(value * 100) / 100;
  };

  const fillPercentage: number = fillLevel / 100;

  const maxLiquidCapacity = liquidUnit.convert(getLiquidCapacityInPack());
  const currentLiquidCapacity = round(maxLiquidCapacity * fillPercentage);

  const maxLiquidWeight = weightUnit.convert(getLiquidWeightInPack());
  const currentLiquidWeight = round(maxLiquidWeight * fillPercentage);

  const itemAndPackWeight = getTotalWeightInPack() + (selectedPack?.weight || 0);
  const maxTotalWeight = weightUnit.convert(getLiquidWeightInPack() + itemAndPackWeight);
  const currentTotalWeight = weightUnit.convert(getLiquidWeightInPack() * fillPercentage + itemAndPackWeight)

  return (
    <Surface style={styles.container} >
      <View style={styles.gridItem}>
        <Text variant="headlineSmall">Current</Text>
      </View>
      <View style={styles.gridItem}>
        <Text variant="headlineSmall">Max</Text>
      </View>

      <Text style={styles.catHeader}>Liquid Capacity</Text>

      <View style={styles.gridItem}>
        <Text variant="titleLarge">{currentLiquidCapacity} {liquidUnit.label}</Text>
      </View>
      <View style={styles.gridItem}>
        <Text variant="titleLarge">{maxLiquidCapacity} {liquidUnit.label}</Text>
      </View>

      <Text style={styles.catHeader}>Liquid Weight</Text>
      <View style={styles.gridItem}>
        <Text variant="titleLarge">{currentLiquidWeight} {weightUnit.label}</Text>
      </View>
      <View style={styles.gridItem}>
        <Text variant="titleLarge">{maxLiquidWeight} {weightUnit.label}</Text>
      </View>

      <Text style={styles.catHeader}>Total Weight</Text>
      <View style={styles.gridItem}>
        <Text variant="titleLarge">{currentTotalWeight} {weightUnit.label}</Text>
      </View>
      <View style={styles.gridItem}>
        <Text variant="titleLarge">{maxTotalWeight} {weightUnit.label}</Text>
      </View>
    </Surface>
  );
};
