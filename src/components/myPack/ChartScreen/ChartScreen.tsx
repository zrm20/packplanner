import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

import { ChartContextProvider } from "../../../hooks";
import { ContainedModalTitle, SafeAreaScreen } from "../../ui";
import CategoryPieChart from "../CategoryPieChart/CategoryPieChart";
import useStyles from "./ChartScreen.styles";
import CategoryChartLegend from "../CategoryChartLegend/CategoryChartLegend";
import CategoryChartToolbar from "../CategoryChartToolbar/CategoryChartToolbar";

export default function ChartScreen(): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container} >
      <ContainedModalTitle title="Weight by Category" />

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
