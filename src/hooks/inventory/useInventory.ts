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
import useSettings from "../settings/useSettings";
import useCategories from "../categories/useCategories";

interface InventoryHook {
  inventorySlice: InventorySliceState,
  inventory: Item[];
  itemsInPack: Item[];
  waterContainersInPack: Item[];
  getItemById(id: string): Item | null;
  addToInventory(item: ItemFormData): void;
  getTotalWeightInPack(): number;
  getLiquidWeightInPack(): number;
};

export default function useInventory(): InventoryHook {
  const inventorySlice = useSelector(state => state.inventory);
  const { getCategoryById } = useCategories();
  const dispatch = useDispatch();
  const { weightUnit, liquidUnit } = useSettings();
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

      // populate the category field
      category: getCategoryById(item.category),

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
      },
      getWeight() {
        const convertedWeight = weightUnit.convert(item.weight);
        return `${convertedWeight} ${weightUnit.label}`;
      },
      getLiquidCapacity() {
        if (!item.liquidCapacity) {
          return '';
        };
        const convertedCapacity = liquidUnit.convert(item.liquidCapacity);
        return `${convertedCapacity} ${liquidUnit.label}`;
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

  // function getBaseWeightInPack(): number {
  //   // TODO
  // };

  function getTotalWeightInPack(): number {
    return itemsInPack.reduce(
      (total: number, currentItem: Item) => (total + currentItem.weight * currentItem.qty),
      0);
  };

  function getLiquidWeightInPack(): number {
    return itemsInPack.reduce(
      (total: number, currentItem: Item) => {
        if (currentItem.liquidCapacity) {
          return total + currentItem.liquidCapacity * currentItem.qty / 1000;
        } else {
          return total;
        };
      },
      0);
  };

  return {
    inventorySlice,
    inventory,
    itemsInPack,
    waterContainersInPack,
    getItemById,
    addToInventory,
    getTotalWeightInPack,
    getLiquidWeightInPack
  };
};