import { useMemo } from "react";

import { useSelector } from "../../redux/reduxHooks";
import useCreateItem from "./useCreateItem";

interface InventoryHook {
  inventory: Item[];
  itemsInPack: Item[];
  waterContainersInPack: Item[];
  baseWeightItemsInPack: Item[];
  getItemById(id: string): Item | null;
  getSortedInventory(items?: Item[]): CategoryMap[];
};

export default function useInventory(): InventoryHook {
  const items = useSelector(state => state.inventory.inventory);
  const idsInPack = useSelector(state => state.myPack.itemsInPack);
  const categories = useSelector(state => state.categories.categories);
  const createItem = useCreateItem();


  const inventory: Item[] = useMemo(() => items.map(createItem), [items, idsInPack, categories]);
  const itemsInPack: Item[] = useMemo(() => inventory.filter(item => item.qty > 0), [inventory]);
  const waterContainersInPack: Item[] =
    useMemo(() => itemsInPack.filter(item => item.liquidCapacity && item.liquidCapacity > 0), [itemsInPack]);
  const baseWeightItemsInPack = useMemo(() => itemsInPack.filter(item => !item.category.isBaseWeightExempt), [itemsInPack, categories])

  function getItemById(id: string): Item | null {
    return inventory.find(item => item.id === id) || null;
  };

  function getSortedInventory(items: Item[]): CategoryMap[] {
    return categories.map(cat => ({
      category: cat.label,
      items: items.filter(item => item.category.id === cat.id)
    }));
  };

  return {
    inventory,
    itemsInPack,
    waterContainersInPack,
    baseWeightItemsInPack,
    getItemById,
    getSortedInventory,
  };
};