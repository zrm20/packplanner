import React from "react";
import { View, ViewStyle } from "react-native";
import { Surface, Text } from "react-native-paper";

import { useInventory, usePacks } from "../../../hooks";
import useStyles from "./MyPackStatsBar.styles";

interface MyPackStatsBarProps {
  style?: ViewStyle;
};

export default function MyPackStatsBar(props: MyPackStatsBarProps): JSX.Element {
  const styles = useStyles();
  const { getTotalWeightInPack, getLiquidWeightInPack } = useInventory();
  const { selectedPack } = usePacks();

  const packWeight: number = selectedPack?.weight || 0;
  const totalItemWeightInPack: number = getTotalWeightInPack();

  const totalWeight: number = Math.round((packWeight + totalItemWeightInPack) * 100) / 100;
  const totalWeightWithLiquid: number = Math.round((totalWeight + getLiquidWeightInPack()) * 100) / 100;

  return (
    <View style={[styles.container, props.style]} >
      <Surface style={styles.surface}>
        <Text>Total Weight: {totalWeight} kg</Text>
        <Text>Total w/Liquid: {totalWeightWithLiquid} kg</Text>
      </Surface>
    </View>
  );
};
