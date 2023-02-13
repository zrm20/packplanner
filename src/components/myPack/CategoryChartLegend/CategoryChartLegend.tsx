import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { useChartContext, useSettings } from "../../../hooks";

import useStyles from "./CategoryChartLegend.styles";


export default function CategoryChartLegend(): JSX.Element {
  const styles = useStyles();
  const { weightUnit } = useSettings();
  const { chartData } = useChartContext();

  chartData.sort((a, b) => b.weight - a.weight);

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
      {
        chartData.map(cat => (
          <View style={styles.legendItem} key={cat.key} >
            <View
              style={
                [
                  styles.legendItemColor,
                  { backgroundColor: cat.color }
                ]
              }
            />
            <Text variant="labelLarge" adjustsFontSizeToFit numberOfLines={1}>
              {cat.name} ({weightUnit.convert(cat.weight)} {weightUnit.label})
            </Text>
          </View>
        ))
      }
    </ScrollView>
  );
};
