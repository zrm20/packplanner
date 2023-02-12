import React from "react";
import { useWindowDimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";

interface ChartData {
  weight: number;
  color: string;
  key: string;
  name: string;
};

const chartConfig: AbstractChartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 5, // optional, default 3
  // barPercentage: 0.5,
};

export default function CategoryPieChart(props: { chartData: ChartData[] }): JSX.Element {
  const { width } = useWindowDimensions();

  return (
    <PieChart
      data={props.chartData}
      width={width}
      height={width}
      chartConfig={chartConfig}
      accessor={"weight"}
      backgroundColor={"transparent"}
      hasLegend={false}
      center={[width / 4, 0]}
      paddingLeft="0"
      absolute
    />
  );
};
