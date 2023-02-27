/* --PACK TYPES-- */
// used in new pack and edit pack forms
interface PackFormData {
  brand: string;
  model: string;
  capacity: number;
  weight: number;
};

// used within the redux store and only contains serializable data
interface PackData extends PackFormData {
  id: string;
};

// contains all of the data AND methods used for a pack
interface Pack extends PackData {
  isSelected: boolean;
  baseFields: PackData,
  select(): void;
  openEdit(): void;
  delete(callback?: Function): void;
  update(newValues: PackFormData, callback?: Function): void;
  getWeight(): string;
};

// used in the redux store
interface PacksSliceState {
  selectedPack: string | null,
  packs: PackData[],
};

/* --INVENTORY TYPES-- */
// used in new item and edit item forms
interface ItemFormData {
  brand?: string;
  name: string;
  weight: number; // in kg
  liquidCapacity?: number; // in ml
  inPack?: boolean;
  category: string;
};

// used within the redux store and only contains serializable data
interface ItemData extends ItemFormData {
  id: string;
  qty: number;
  isPacked: boolean; // this descibes wether the item has acutally been packe, i.e. the checklist is checked
};

// contains all of the data AND methods used for an item
interface Item extends ItemData {
  baseFields: ItemData;
  category: Category;
  toggleInPack(): void;
  toggleIsPacked(): void;
  openEdit(): void;
  update(newValues: ItemFormData, callback?: Function): void;
  delete(callback?: Function): void;
  updateQty(newQty: number): void;
  getWeight(): string;
  getLiquidCapacity(): string;
};

// used in the redux store
interface InventorySliceState {
  inventory: ItemData[];
};

type WeightUnit = "oz" | "lb" | "kg";

interface WeightMapField {
  value: WeightUnit;
  label: string;
  icon: MaterialWeightIcon;
  convert(kgValue: number): number;
};

type LiquidCapacityUnit = 'ml' | 'oz';

interface LiquidMapField {
  value: LiquidCapacityUnit;
  label: string;
  convert(mlValue: number): number;
};

/* --SETTINGS TYPES-- */
interface SettingsSliceState {
  weightUnits: WeightUnit;
  liquidUnits: LiquidCapacityUnit;
};

/* --CATEGORIES -- */
interface CategoryFormData {
  label: string;
  icon: string;
  isBaseWeightExempt: boolean;
};

interface CategoryData extends CategoryFormData {
  id: string,
  value: string;
  isStockCategory: boolean;
};

interface Category extends CategoryData {
  baseFields: CategoryData
  delete(callback?: Function): void,
  update(newValues: CategoryFormData, callback?: Function): void;
};

interface CategorySliceState {
  categories: CategoryData[];
};

interface CategoryMap {
  category: string;
  items: Item[];
}

// pieChart
interface ChartDataItem {
  weight: number;
  color: string;
  key: string;
  name: string;
};

type ChartData = ChartDataItem[];

interface User {
  name: string | null;
  uid: string;
  email: string | null;
};

interface UserSliceState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

interface RegisterFormData {
  email: string,
  password: string,
  confirmPassword: string
};

interface LoginFormData {
  email: string;
  password: string;
};