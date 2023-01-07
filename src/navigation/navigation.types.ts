
export type LockerStackParamList = {
  Inventory: undefined;
  NewPack: undefined;
  EditPack: { pack: PackData | string };
  NewItem: undefined;
  EditItem: { item: ItemData | string };
};

export type TabParamList = {
  Locker: LockerStackParamList;
  MyPack: LockerStackParamList; // TODO Change this
  Water: LockerStackParamList; // TODO Change this
  Categories:  LockerStackParamList; // TODO Change this
  Settings:  LockerStackParamList; // TODO Change this
};


declare global {
  namespace ReactNavigation {
    interface RootParamList extends LockerStackParamList {}
  }
}