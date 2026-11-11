import chroma from 'chroma-js';
import { createContext, useContext, useState, ReactNode } from 'react';

import { chartColors, liquidChartColor, packChartColor } from '../../constants';
import { useSelector } from '../../redux/reduxHooks';
import { getTotalLiquidWeight, getTotalWeight } from '../../utils/inventoryUtils/inventoryUtils';
import useInventory from '../inventory/useInventory';
import usePacks from '../packs/usePacks';

interface ChartContextValues {
  liquidLevel: number;
  setLiquidLevel(value: number): void;
  baseWeightOnly: boolean;
  handleChangeBaseWeightOnly(value: boolean): void;
  hideLiquidWeight: boolean;
  setHideLiquidWeight(value: boolean): void;
  chartData: ChartData;
}

const ChartContext = createContext<ChartContextValues | null>(null);

interface Props {
  children?: ReactNode;
}

export function ChartContextProvider(props: Props): JSX.Element {
  const [liquidLevel, setLiquidLevel] = useState(100);
  const [baseWeightOnly, setBaseWeightOnly] = useState(false);
  const [hideLiquidWeight, setHideLiquidWeight] = useState(false);
  const { itemsInPack } = useInventory();
  const { selectedPack } = usePacks();
  const categories = useSelector((state) => state.categories.categories);

  const sortedItems = categories.map((cat) => ({
    category: cat,
    items: itemsInPack.filter((i) => i.category === cat.id),
  }));

  function handleChangeBaseWeightOnly(newVal: boolean): void {
    setBaseWeightOnly(newVal);

    if (newVal) {
      // when setting true, also set hideLiquidWeight to true
      setHideLiquidWeight(newVal);
    }
  }

  const chartData: ChartData = sortedItems
    .filter((cat) => cat.items.length > 0) // remove categories without items
    // if baseWeightOnly is true, filter out categories that are baseWeightExempt
    .filter((cat) => (baseWeightOnly ? !cat.category.isBaseWeightExempt : true))
    .map((cat, i) => ({
      weight: getTotalWeight(cat.items),
      name: cat.category.label,
      key: cat.category.id,
      color: chroma(chartColors[i % chartColors.length])
        .brighten(Math.floor(i / chartColors.length))
        .hex(),
    }));

  // add the pack weight to the chart data
  chartData.push({
    weight: selectedPack?.weight || 0,
    name: 'Pack',
    key: 'Pack-stock',
    color: packChartColor,
  });

  // add the liquid weight to chart data IF showing liquid weight
  if (!hideLiquidWeight) {
    chartData.push({
      weight: (getTotalLiquidWeight(itemsInPack) * liquidLevel) / 100,
      name: 'Liquid',
      key: 'Liquid-stock',
      color: liquidChartColor,
    });
  }

  const values: ChartContextValues = {
    liquidLevel,
    setLiquidLevel,
    baseWeightOnly,
    handleChangeBaseWeightOnly,
    hideLiquidWeight,
    setHideLiquidWeight,
    chartData,
  };

  return <ChartContext.Provider value={values}>{props.children}</ChartContext.Provider>;
}

export default function useChartContext() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('useChartContext must be used inside a ChartContextProvider');
  }

  return context;
}
