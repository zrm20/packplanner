import React from 'react';
import { useWindowDimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';

import { useChartContext } from '../../../hooks';

const chartConfig: AbstractChartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 5, // optional, default 3
  // barPercentage: 0.5,
};

export default function CategoryPieChart(): JSX.Element {
  const { width } = useWindowDimensions();
  const { chartData } = useChartContext();

  return (
    <PieChart
      data={chartData}
      width={width}
      height={width}
      chartConfig={chartConfig}
      accessor="weight"
      backgroundColor="transparent"
      hasLegend={false}
      center={[width / 4, 0]}
      paddingLeft="0"
      absolute
    />
  );
}
