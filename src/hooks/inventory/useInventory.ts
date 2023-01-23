import { useNavigation } from "@react-navigation/native";

import { useSelector, useDispatch } from "../../redux/reduxHooks";
import { confirmDelete } from "../../utils";
import {
  addItem as addAction,
  deleteItem as deleteAction,
  updateItem as updateAction,
  toggleInPack as toggleAction,
  updateQty as updateQtyAction
} from "../../redux/inventorySlice";

interface InventoryHook {
  inventorySlice: InventorySliceState,
  inventory: Item[];
  itemsInPack: Item[];
  waterContainersInPack: Item[];
  getItemById(id: string): Item | null;
  addToInventory(pack: ItemFormData): void;
};

export default function useInventory(): InventoryHook {
  const inventorySlice = useSelector(state => state.inventory);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  if (!inventorySlice) {
    throw new Error("useInventory must be used within a Redux Provider that contains an inventory reducer");
  };

  function createItem(item: ItemData): Item {
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
        navigate('Locker', { screen: 'EditItem', params: { item: item.id } })
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
      },
      updateQty(newQty: number) {
        dispatch(updateQtyAction({ id: item.id, newQty }))
      }
    }
  };

  const inventory: Item[] = inventorySlice.inventory.map(createItem);
  const itemsInPack: Item[] = inventory.filter(item => item.inPack);
  const waterContainersInPack: Item[] = inventory.filter(item => item.inPack && item.liquidCapacity && item.liquidCapacity > 0);

  function getItemById(id: string): Item | null {
    return inventory.find(item => item.id === id) || null;
  };

  function addToInventory(newItem: ItemFormData): void {
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