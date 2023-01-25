import { mlToFlOz } from "../utils/liquidConversions/liquidConversions";


interface LiquidMapField {
  value: LiquidCapacityUnit;
  label: string;
  convert(mlValue: number): number;
};

interface LiquidMap {
  oz: LiquidMapField,
  ml: LiquidMapField,
};

const liquidMap: LiquidMap = {
  ml: {
    value: 'ml',
    label: 'ml',
    convert: (mlValue: number) => mlValue
  },
  oz: {
    value: 'oz',
    label: 'fl oz',
    convert: mlToFlOz
  }
};

export default liquidMap;