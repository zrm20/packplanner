import { useNavigation } from "@react-navigation/native";

import { useSelector, useDispatch } from "../../redux/reduxHooks";
import { confirmDelete } from "../../utils";
import {
  Item as StateItem,
  ItemValues,
  InventoryState,
  addItem as addAction,
  deleteItem as deleteAction,
  updateItem as updateAction,
  toggleInPack as toggleAction,
} from "../../redux/inventorySlice";

interface InventoryHook {
  inventorySlice: InventoryState,
  inventory: Item[];
  itemsInPack: Item[];
  waterContainersInPack: Item[];
  getItemById(id: string): Item;
  addToInventory(pack: ItemValues): void;
};

export interface Item extends StateItem {
  baseFields: StateItem;
  toggleInPack(): void;
  openEdit(): void;
  update(newValues: ItemValues, callback?: Function): void;
  delete(callback?: Function): void;
};

export default function useInventory(): InventoryHook {
  const inventorySlice = useSelector(state => state.inventory);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  if (!inventorySlice) {
    throw new Error("useInventory must be used within a Redux Provider that contains an inventory reducer");
  };

  function createItem(item: StateItem): Item {
    return {
       // item properties
       ...item,

       // base fields is used for distributing only the original fields
       baseFields: {
         ...item
       },
 
       // item methods
       toggleInPack() {
         dispatch(toggleAction({ id: item.id }));
       },
       openEdit() {
         navigate("EditItem", { item })
       },
       update(newValues, callback) {
         dispatch(updateAction({ newValues, id: item.id }));
         if (callback) {
           callback();
         };
       },
       delete(callback) {
         confirmDelete(
           () => dispatch(deleteAction({ id: item.id })),
           `Do you want to perminantly delete ${item.brand ? item.brand + ' ' : null}${item.name}?`,
           callback
         );
       }
    }
  };

  const inventory: Item[] = inventorySlice.inventory.map(createItem);
  const itemsInPack: Item[] = inventory.filter(item => item.inPack);
  const waterContainersInPack: Item[] = inventory.filter(item => item.inPack && item.liquidCapacity > 0);

  function getItemById(id: string): Item {
    return inventory.find(item => item.id === id);
  };

  function addToInventory(newItem: ItemValues): void {
    dispatch(addAction({ item: newItem }));
  };

  return {
    inventorySlice,
    inventory,
    itemsInPack,
    waterContainersInPack,
    getItemById,
    addToInventory,
  };
};