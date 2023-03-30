import { weightMap, liquidMap } from '../../constants';
import { useSelector, useDispatch } from '../../redux/reduxHooks';
import { changeLiquidUnits, changeWeightUnits } from '../../redux/settingsSlice';

interface SettingsHook {
  settingsSlice: SettingsSliceState;
  weightUnit: WeightMapField;
  liquidUnit: LiquidMapField;
  setWeightUnits(newUnit: WeightUnit): void;
  setLiquidUnits(newUnit: LiquidCapacityUnit): void;
}

export default function useSettings(): SettingsHook {
  const settingsSlice = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  function setLiquidUnits(newUnit: LiquidCapacityUnit): void {
    dispatch(changeLiquidUnits({ newUnit }));
  }

  function setWeightUnits(newUnit: WeightUnit): void {
    dispatch(changeWeightUnits({ newUnit }));
  }

  const weightUnit = weightMap[settingsSlice.weightUnits];
  const liquidUnit = liquidMap[settingsSlice.liquidUnits];

  return {
    settingsSlice,
    weightUnit,
    liquidUnit,
    setLiquidUnits,
    setWeightUnits,
  };
}
