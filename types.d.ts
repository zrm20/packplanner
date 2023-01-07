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
  baseFields: StorePack,
  select(): void;
  openEdit(): void;
  delete(callback?: Function): void;
  update(newValues: PackValues, callback?: Function): void;
};

// used in the redux store
interface PacksSliceState {
  selectedPack: string | null,
  packs: PackData[],
};