import React from "react";
import { View } from "react-native";
import { Divider, Text } from "react-native-paper";

import { ChartContextProvider } from "../../../hooks";
import { CloseScreenButton, SafeAreaScreen } from "../../ui";
import CategoryPieChart from "../CategoryPieChart/CategoryPieChart";
import useStyles from "./ChartScreen.styles";
import CategoryChartLegend from "../CategoryChartLegend/CategoryChartLegend";
import CategoryChartToolbar from "../CategoryChartToolbar/CategoryChartToolbar";

export default function ChartScreen(): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container} >
      <CloseScreenButton androidOnly />
      <Text variant="headlineMedium" style={styles.title}>
        Weight by Category
      </Text>

      <ChartContextProvider>
        <View style={styles.chartContainer}>
          <CategoryPieChart />
        </View>

        <Divider />

        <CategoryChartToolbar />

        <Divider />

        <View style={styles.legendContainer}>
          <CategoryChartLegend />
        </View>
      </ChartContextProvider>
    </SafeAreaScreen>
  );
};
