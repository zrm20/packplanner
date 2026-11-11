import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

import useStyles from './ChartScreen.styles';
import { ChartContextProvider, useChartContext, usePacks, useSettings } from '../../../hooks';
import { ContainedModalTitle, SafeAreaScreen } from '../../ui';
import CategoryChartLegend from '../CategoryChartLegend/CategoryChartLegend';
import CategoryChartToolbar from '../CategoryChartToolbar/CategoryChartToolbar';
import CategoryPieChart from '../CategoryPieChart/CategoryPieChart';

function Breakdown(): JSX.Element {
  const styles = useStyles();
  const { chartData, baseWeightOnly } = useChartContext();
  const { selectedPack } = usePacks();
  const { weightUnit } = useSettings();
  const total = chartData.reduce((weight, category) => weight + category.weight, 0);
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.chartContainer}>
        <Text variant="labelMedium" style={styles.eyebrow}>
          {baseWeightOnly ? 'Base weight' : 'Displayed weight'}
        </Text>
        <Text variant="headlineLarge">
          {Math.round(weightUnit.convert(total) * 100) / 100} {weightUnit.label}
        </Text>
        {total > 0 ? (
          <CategoryPieChart />
        ) : (
          <Text style={styles.empty}>Add gear to your pack to see the weight breakdown.</Text>
        )}
        <Text variant="bodyMedium" style={styles.caption}>
          {selectedPack
            ? `${selectedPack.brand} ${selectedPack.model}`
            : 'No pack selected · Gear weight only'}
        </Text>
      </View>
      <CategoryChartToolbar />
      <Text variant="titleMedium" style={styles.section}>
        By category
      </Text>
      <CategoryChartLegend />
    </ScrollView>
  );
}

export default function ChartScreen(): JSX.Element {
  return (
    <SafeAreaScreen>
      <ContainedModalTitle title="Weight breakdown" />
      <ChartContextProvider>
        <Breakdown />
      </ChartContextProvider>
    </SafeAreaScreen>
  );
}
