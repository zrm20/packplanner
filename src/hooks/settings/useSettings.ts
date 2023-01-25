import { useSelector, useDispatch } from "../../redux/reduxHooks";
import { changeLiquidUnits, changeWeightUnits } from "../../redux/settingsSlice";

interface SettingsHook {
  weightUnits: WeightUnit;
  liquidUnits: LiquidCapacityUnit;
  setWeightUnits(newUnit: WeightUnit): void;
  setLiquidUnits(newUnit: LiquidCapacityUnit): void;
};

export default function useSettings(): SettingsHook {
  const settingsSlice = useSelector(state => state.settings);
  const dispatch = useDispatch();

  function setLiquidUnits(newUnit: LiquidCapacityUnit): void {
    dispatch(changeLiquidUnits({ newUnit }));
  };

  function setWeightUnits(newUnit: WeightUnit): void {
    dispatch(changeWeightUnits({ newUnit }));
  };

  return {
    ...settingsSlice,
    setLiquidUnits,
    setWeightUnits
  };
};