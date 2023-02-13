import { createContext, useContext, useState } from "react";
import chroma from "chroma-js";

import useInventory from "../inventory/useInventory";
import usePacks from "../packs/usePacks";
import { chartColors } from "../../constants";

interface ChartContextValues {
  liquidLevel: number,
  setLiquidLevel(value: number): void;
  baseWeightOnly: boolean;
  setBaseWeightOnly(value: boolean): void;
  hideLiquidWeight: boolean;
  setHideLiquidWeight(value: boolean): void;
  chartData: ChartData
};

const ChartContext = createContext<ChartContextValues | null>(null);

interface Props {
  children?: JSX.Element[]
}

export function ChartContextProvider(props: Props): JSX.Element {
  const [liquidLevel, setLiquidLevel] = useState(100);
  const [baseWeightOnly, setBaseWeightOnly] = useState(false);
  const [hideLiquidWeight, setHideLiquidWeight] = useState(false);
  const { itemsInPack, getSortedInventory, getLiquidWeightInPack } = useInventory();
  const { selectedPack } = usePacks();

  const sortedItems = getSortedInventory(itemsInPack);

  const chartData: ChartData =
    sortedItems
      .filter(cat => cat.items.length > 0) // remove categories without items
      .map((cat, i) => ({
        weight: cat.items.reduce((tot, currItem) => (tot + currItem.weight), 0),
        name: cat.category,
        key: cat.category,
        color: i < chartColors.length ? chartColors[i] : chroma.random().hex()
      }));

  // add the pack weight to the chart data
  chartData.push(
    {
      weight: selectedPack?.weight || 0,
      name: "Pack",
      key: "Pack-stock",
      color: "#808080"
    }
  );

  // add the liquid weight to chart data
  chartData.push(
    {
      weight: getLiquidWeightInPack(),
      name: "Liquid",
      key: "Liquid-stock",
      color: "#00ffff"
    }
  );

  const values: ChartContextValues = {
    liquidLevel,
    setLiquidLevel,
    baseWeightOnly,
    setBaseWeightOnly,
    hideLiquidWeight,
    setHideLiquidWeight,
    chartData
  };

  return (
    <ChartContext.Provider value={values}>
      {props.children}
    </ChartContext.Provider>
  )
};

export default function useChartContext() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChartContext must be used inside a ChartContextProvider");
  };

  return context;
};