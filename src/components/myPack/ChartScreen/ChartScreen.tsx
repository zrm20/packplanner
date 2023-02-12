import React from "react";
import { ScrollView, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import chroma from "chroma-js";

import { useInventory, usePacks } from "../../../hooks";
import { CloseScreenButton, SafeAreaScreen } from "../../ui";
import CategoryPieChart from "../CategoryPieChart/CategoryPieChart";
import useStyles from "./ChartScreen.styles";

export default function ChartScreen(): JSX.Element {
  const styles = useStyles();
  const { itemsInPack, getSortedInventory, getLiquidWeightInPack } = useInventory();
  const { selectedPack } = usePacks();

  const sortedItems = getSortedInventory(itemsInPack);

  const chartData =
    sortedItems
      .filter(cat => cat.items.length > 0) // remove categories without items
      .map(cat => ({
        weight: cat.items.reduce((tot, currItem) => (tot + currItem.weight), 0),
        name: cat.category,
        key: cat.category,
        color: chroma.random().hex()
      }));

  // add the pack weight to the chart data
  chartData.push(
    {
      weight: selectedPack?.weight || 0,
      name: "Pack",
      key: "Pack-stock",
      color: "#000"
    }
  );

  // add the liquid weight to chart data
  chartData.push(
    {
      weight: getLiquidWeightInPack(),
      name: "Liquid",
      key: "Liquid-stock",
      color: "#0AFF"
    }
  );

  return (
    <SafeAreaScreen style={styles.container} >
      <CloseScreenButton androidOnly />
      <Text variant="headlineLarge" style={styles.title}>
        Weight by Category
      </Text>

      <View style={styles.chartContainer}>
        <CategoryPieChart chartData={chartData} />
      </View>

      <Divider />

      <ScrollView>

      </ScrollView>

    </SafeAreaScreen>
  );
};
