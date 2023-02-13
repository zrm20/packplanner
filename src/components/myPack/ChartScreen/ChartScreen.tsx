import React from "react";
import { ScrollView, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import chroma from "chroma-js";

import { useInventory, usePacks } from "../../../hooks";
import { CloseScreenButton, SafeAreaScreen } from "../../ui";
import CategoryPieChart from "../CategoryPieChart/CategoryPieChart";
import useStyles from "./ChartScreen.styles";
import CategoryChartLegend from "../CategoryChartLegend/CategoryChartLegend";
import { chartColors } from "../../../constants";

export default function ChartScreen(): JSX.Element {
  const styles = useStyles();
  const { itemsInPack, getSortedInventory, getLiquidWeightInPack } = useInventory();
  const { selectedPack } = usePacks();

  const sortedItems = getSortedInventory(itemsInPack);

  const chartData: ChartData =
    sortedItems
      .filter(cat => cat.items.length > 0) // remove categories without items
      .map((cat, i) => ({
        weight: cat.items.reduce((tot, currItem) => (tot + currItem.weight), 0),
        name: cat.category,
        key: cat.category,
        color: i < chartColors.length ? chartColors[i] : chroma.random().hex()
      }));

  // add the pack weight to the chart data
  chartData.push(
    {
      weight: selectedPack?.weight || 0,
      name: "Pack",
      key: "Pack-stock",
      color: "#808080"
    }
  );

  // add the liquid weight to chart data
  chartData.push(
    {
      weight: getLiquidWeightInPack(),
      name: "Liquid",
      key: "Liquid-stock",
      color: "#00ffff"
    }
  );

  return (
    <SafeAreaScreen style={styles.container} >
      <CloseScreenButton androidOnly />
      <Text variant="headlineMedium" style={styles.title}>
        Weight by Category
      </Text>

      <View style={styles.chartContainer}>
        <CategoryPieChart chartData={chartData} />
      </View>

      <Divider />

      <View style={styles.legendContainer}>
        <CategoryChartLegend chartData={chartData} />
      </View>
    </SafeAreaScreen>
  );
};
