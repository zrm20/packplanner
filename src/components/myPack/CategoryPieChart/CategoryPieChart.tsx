import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { Text } from 'react-native-paper';

import { useChartContext, useSettings } from '../../../hooks';
import { useTheme } from '../../../theme';

const chartConfig: AbstractChartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 5, // optional, default 3
  // barPercentage: 0.5,
};

export default function CategoryPieChart(): JSX.Element {
  const { width: windowWidth } = useWindowDimensions();
  const { colors, space } = useTheme();
  const width = Math.max(1, Math.min(windowWidth - space[3] * 2 - 2, 320));
  const { chartData } = useChartContext();
  const { weightUnit } = useSettings();
  const total = chartData.reduce((weight, category) => weight + category.weight, 0);
  const hole = width * 0.58;

  return (
    <View style={{ width, height: width }}>
      <PieChart
        data={chartData.filter((category) => category.weight > 0)}
        width={width}
        height={width}
        chartConfig={{ ...chartConfig, color: () => colors.primary }}
        accessor="weight"
        backgroundColor="transparent"
        hasLegend={false}
        center={[width / 4, 0]}
        paddingLeft="0"
        absolute
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: (width - hole) / 2,
          top: (width - hole) / 2,
          width: hole,
          height: hole,
          borderRadius: hole / 2,
          backgroundColor: colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text variant="headlineMedium">
          {Math.round(weightUnit.convert(total) * 100) / 100} {weightUnit.label}
        </Text>
      </View>
    </View>
  );
}
