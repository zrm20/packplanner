/**
 * DISPOSABLE: Chart screen copy with liquid level seeded from prototype query.
 * Production ChartScreen stays at default 100% fill.
 */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';

import CategoryChartLegend from '../components/myPack/CategoryChartLegend/CategoryChartLegend';
import CategoryChartToolbar from '../components/myPack/CategoryChartToolbar/CategoryChartToolbar';
import CategoryPieChart from '../components/myPack/CategoryPieChart/CategoryPieChart';
import useStyles from '../components/myPack/ChartScreen/ChartScreen.styles';
import { ContainedModalTitle, SafeAreaScreen } from '../components/ui';
import { ChartContextProvider, useChartContext } from '../hooks';
import { usePrototypeControls } from './PrototypeControlsContext';

function SeedChartLiquid({ children }: { children: React.ReactNode }): JSX.Element {
  const { chartLiquid } = usePrototypeControls();
  const { setLiquidLevel } = useChartContext();

  useEffect(() => {
    setLiquidLevel(chartLiquid);
  }, [chartLiquid, setLiquidLevel]);

  return <>{children}</>;
}

export default function PrototypeChartScreen(): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container}>
      <ContainedModalTitle title="Weight by Category" />

      <ChartContextProvider>
        <SeedChartLiquid>
          <View style={styles.chartContainer}>
            <CategoryPieChart />
          </View>

          <Divider />

          <CategoryChartToolbar />

          <Divider />

          <View style={styles.legendContainer}>
            <CategoryChartLegend />
          </View>
        </SeedChartLiquid>
      </ChartContextProvider>
    </SafeAreaScreen>
  );
}
