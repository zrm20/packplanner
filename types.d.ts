/* --PACK TYPES-- */
// used in new pack and edit pack forms
interface PackFormData {
  brand: string;
  model: string;
  capacity: number;
  weight: number;
};

// pack data that is sent to the Firestore DB
interface PackDocument extends PackFormData {
  uid: string;
};

// pack data that is return from Firestore and stored in Redux
interface PackData extends PackFormData {
  id: string;
};

// attaches methods to pack
interface PackModel extends PackData {
  select(): void;
  openEdit(): void;
  delete(callback?: Function): void;
  update(newValues: PackFormData, callback?: Function): void;
  getWeight(): string;
};

// used in the redux store
interface PacksSliceState {
  packs: PackData[];
  isLoading: boolean;
};

/* --INVENTORY TYPES-- */
// used in new item and edit item forms
interface ItemFormData {
  brand?: string;
  name: string;
  weight: number; // in kg
  liquidCapacity?: number; // in ml
  category: string;
};

interface ItemDocument extends ItemFormData {
  uid: string;
};

// used within the redux store and only contains serializable data
interface ItemData extends ItemFormData {
  id: string;
};

interface PackedItem {
  id: string,
  qty: number,
  isPacked: boolean
};

// contains all of the data AND methods used for an item
interface Item extends ItemData, PackedItem { };

interface ItemModel extends Item {
  category: CategoryData;
  addToPack(): void;
  toggleIsPacked(): void;
  openEdit(): void;
  update(newValues: ItemFormData, callback?: Function): void;
  delete(callback?: Function): void;
  setQty(newQty: number): void;
  getWeight(): string;
  getLiquidCapacity(): string;
};

// used in the redux store
interface InventorySliceState {
  inventory: ItemData[];
  isLoading: boolean;
};

// myPack
interface MyPackSliceState {
  selectedPack: string | null,
  itemsInPack: PackedItem[]
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

interface CategoryDocument extends CategoryFormData {
  uid: string;
}

interface CategoryData extends CategoryDocument {
  id: string,
  value: string;
  isStockCategory: boolean;
};

interface Category extends CategoryData {
  baseFields: CategoryData
  update(newValues: CategoryFormData, callback?: Function): void;
};

interface CategorySliceState {
  categories: CategoryData[];
  isLoading: boolean;
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

interface GuestUser {
  uid: string;
}

interface UserSliceState {
  user: User | GuestUser | null;
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

interface TripListFormData {
  name: string;
  myPackState: MyPackSliceState;
};

interface TripListDocument extends TripListFormData {
  uid: string;
}

interface TripListData extends TripListDocument {
  id: string;
}

interface ListSliceState {
  lists: TripListData[]
};

interface AlertNotification {
  type: "info" | "warning" | "error";
  message: string;
  title?: string;
  code?: string;
  duration?: number;
  icon?: string;
  buttonText?: string;
  action?(): void;
}

interface AlertSliceState {
  alert: AlertNotification | null
};

declare module "*.png";