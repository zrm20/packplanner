import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';

import useStyles from './ChartScreen.styles';
import { ChartContextProvider } from '../../../hooks';
import { ContainedModalTitle, SafeAreaScreen } from '../../ui';
import CategoryChartLegend from '../CategoryChartLegend/CategoryChartLegend';
import CategoryChartToolbar from '../CategoryChartToolbar/CategoryChartToolbar';
import CategoryPieChart from '../CategoryPieChart/CategoryPieChart';

export default function ChartScreen(): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container}>
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
}
