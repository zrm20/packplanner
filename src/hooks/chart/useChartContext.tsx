import { createContext, useContext, useState } from "react";
import chroma from "chroma-js";

import useInventory from "../inventory/useInventory";
import usePacks from "../packs/usePacks";
import { chartColors } from "../../constants";
import { getTotalLiquidWeight, getTotalWeight } from "../../utils/inventoryUtils/inventoryUtils";
import { useSelector } from "../../redux/reduxHooks";

interface ChartContextValues {
  liquidLevel: number,
  setLiquidLevel(value: number): void;
  baseWeightOnly: boolean;
  handleChangeBaseWeightOnly(value: boolean): void;
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
  const { itemsInPack } = useInventory();
  const { selectedPack } = usePacks();
  const categories = useSelector(state => state.categories.categories);

  const sortedItems = categories.map(cat => (
    {
      category: cat,
      items: itemsInPack.filter(i => i.category === cat.id)
    }
  ));

  function handleChangeBaseWeightOnly(newVal: boolean): void {
    setBaseWeightOnly(newVal);

    if (newVal) { // when setting true, also set hideLiquidWeight to true
      setHideLiquidWeight(newVal);
    }
  };

  const chartData: ChartData =
    sortedItems
      .filter(cat => cat.items.length > 0) // remove categories without items
      // if baseWeightOnly is true, filter out categories that are baseWeightExempt
      .filter(cat => baseWeightOnly ? !cat.category.isBaseWeightExempt : true)
      .map((cat, i) => ({
        weight: getTotalWeight(cat.items),
        name: cat.category.label,
        key: cat.category.id,
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

  // add the liquid weight to chart data IF showing liquid weight
  if (!hideLiquidWeight) {
    chartData.push(
      {
        weight: getTotalLiquidWeight(itemsInPack) * liquidLevel / 100,
        name: "Liquid",
        key: "Liquid-stock",
        color: "#00ffff"
      }
    );
  }

  const values: ChartContextValues = {
    liquidLevel,
    setLiquidLevel,
    baseWeightOnly,
    handleChangeBaseWeightOnly,
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