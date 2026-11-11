import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import useStyles from './CategoryChartLegend.styles';
import { useChartContext, useSettings } from '../../../hooks';

export default function CategoryChartLegend(): JSX.Element {
  const styles = useStyles();
  const { weightUnit } = useSettings();
  const { chartData } = useChartContext();
  const total = chartData.reduce((weight, category) => weight + category.weight, 0);
  return (
    <View style={styles.container}>
      {[...chartData]
        .sort((a, b) => b.weight - a.weight)
        .map((category) => (
          <View style={styles.legendItem} key={category.key}>
            <View style={[styles.legendItemColor, { backgroundColor: category.color }]} />
            <Text variant="bodyMedium" style={styles.name}>
              {category.name}
            </Text>
            <View style={styles.figures}>
              <Text variant="labelLarge">
                {Math.round(weightUnit.convert(category.weight) * 100) / 100} {weightUnit.label}
              </Text>
              <Text variant="bodySmall">
                {total ? Math.round((category.weight / total) * 100) : 0}%
              </Text>
            </View>
          </View>
        ))}
    </View>
  );
}
