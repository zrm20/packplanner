import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { useSettings } from "../../../hooks";

import useStyles from "./CategoryChartLegend.styles";

interface CategoryChartLegendProps {
  chartData: ChartData
};

export default function CategoryChartLegend(props: CategoryChartLegendProps): JSX.Element {
  const styles = useStyles();
  const { weightUnit } = useSettings();
  const { chartData } = props;

  chartData.sort((a, b) => b.weight - a.weight);

  return (
    <ScrollView>
      {
        chartData.map(cat => (
          <View style={styles.legendItem} >
            <View
              style={
                [
                  styles.legendItemColor,
                  { backgroundColor: cat.color }
                ]
              }
            />
            <Text variant="labelLarge">{cat.name} - {weightUnit.convert(cat.weight)} {weightUnit.label}</Text>
          </View>
        ))
      }
    </ScrollView>
  );
};
