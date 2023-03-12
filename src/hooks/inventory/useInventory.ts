import { useSelector, useDispatch } from "../../redux/reduxHooks";
import { addItem as addAction, emptyPack as emptyPackAction } from "../../redux/inventorySlice";
import useCategories from "../categories/useCategories";
import useCreateItem from "./useCreateItem";
import { confirmDelete } from "../../utils";

interface InventoryHook {
  inventorySlice: InventorySliceState,
  inventory: Item[];
  itemsInPack: Item[];
  waterContainersInPack: Item[];
  getItemById(id: string): Item | null;
  addToInventory(item: ItemFormData): void;
  getTotalWeightInPack(): number;
  getLiquidWeightInPack(): number;
  getSortedInventory(items?: Item[]): CategoryMap[];
  getBaseWeightInPack(): number;
  emptyPack(): void;
  getLiquidCapacityInPack(): number;
};

export default function useInventory(): InventoryHook {
  const inventorySlice = useSelector(state => state.inventory);
  const { categories } = useCategories();
  const dispatch = useDispatch();
  const createItem = useCreateItem();

  if (!inventorySlice) {
    throw new Error("useInventory must be used within a Redux Provider that contains an inventory reducer");
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

  function getTotalWeightInPack(): number {
    return itemsInPack.reduce(
      (total: number, currentItem: Item) => (total + currentItem.weight * currentItem.qty),
      0);
  };

  function getBaseWeightInPack(): number {
    return itemsInPack.reduce(
      (total: number, currentItem: Item) => {
        if (!currentItem.category.isBaseWeightExempt) {
          return total + currentItem.weight * currentItem.qty;
        } else {
          return total;
        };
      }, 0)
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

  function getLiquidCapacityInPack(): number {
    return itemsInPack.reduce(
      (total: number, currentItem: Item) => {
        if (currentItem.liquidCapacity) {
          return total + currentItem.liquidCapacity * currentItem.qty;
        } else {
          return total;
        };
      },
      0);
  };

  function getSortedInventory(items?: Item[]): CategoryMap[] {
    if (items) {
      // if items are passed as params, sort them into categories
      return categories.map(cat => {
        return {
          category: cat.label,
          items: items.filter(item => item.category.id === cat.id)
        }
      });
    };

    // if no item param received, sort the whole inventory
    return categories.map(cat => {
      return {
        category: cat.label,
        items: inventory.filter(item => item.category.id === cat.id)
      }
    });
  };

  function emptyPack(): void {
    confirmDelete(
      () => dispatch(emptyPackAction()),
      "Are you sure you want to remove all items from your pack?"
    )
  };

  return {
    inventorySlice,
    inventory,
    itemsInPack,
    waterContainersInPack,
    getItemById,
    addToInventory,
    getTotalWeightInPack,
    getLiquidWeightInPack,
    getSortedInventory,
    getBaseWeightInPack,
    emptyPack,
    getLiquidCapacityInPack
  };
};