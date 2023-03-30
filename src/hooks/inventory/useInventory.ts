import { useMemo } from 'react';

import { useSelector } from '../../redux/reduxHooks';

export default function useInventory() {
  const inventory: Item[] = useSelector((state) => {
    const items = state.inventory.inventory;
    const inPackItems = state.myPack.itemsInPack;

    return items.map((item) => {
      const matchingItem = inPackItems.find((i) => i.id === item.id);
      return {
        ...item,
        qty: matchingItem?.qty || 0,
        isPacked: matchingItem?.isPacked || false,
      };
    });
  });
  const isLoading = useSelector((state) => state.inventory.isLoading);

  const baseWeightExemptCategories = useSelector((state) =>
    state.categories.categories.filter((c) => c.isBaseWeightExempt).map((c) => c.id)
  );

  const itemsInPack: Item[] = useMemo(() => inventory.filter((i) => i.qty > 0), [inventory]);

  function getItemById(id: string): ItemData | null {
    return inventory.find((item) => item.id === id) || null;
  }

  function getBaseWeightItems(items: Item[]): Item[] {
    return items.filter((item) => !baseWeightExemptCategories.includes(item.category));
  }

  return {
    inventory,
    itemsInPack,
    isLoading,
    getItemById,
    getBaseWeightItems,
  };
}
