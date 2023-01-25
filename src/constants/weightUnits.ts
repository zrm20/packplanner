import { kgToLbs, kgToOz, roundedKg } from "../utils/weightConversions/weightConversions";

type MaterialWeightIcon = "weight-kilogram" | "weight-lb" | "weight";

interface WeightMapField {
  value: WeightUnit;
  label: string;
  icon: MaterialWeightIcon;
  convert(kgValue: number): number;
};

interface WeightMap {
  oz: WeightMapField,
  lb: WeightMapField,
  kg: WeightMapField,
};

const weightMap: WeightMap = {
  oz: {
    value: 'oz',
    label: 'oz',
    icon: "weight",
    convert: kgToOz
  },
  lb: {
    value: 'lb',
    label: 'lbs',
    icon: "weight-lb",
    convert: kgToLbs
  },
  kg: {
    value: 'kg',
    label: "kg",
    icon: "weight-kilogram",
    convert: roundedKg
  }
};

export default weightMap;