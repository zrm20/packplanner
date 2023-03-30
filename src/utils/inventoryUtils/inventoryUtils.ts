export function getTotalWeight(items: Item[]): number {
  return items.reduce(
    (total: number, currentItem: Item) => total + currentItem.weight * currentItem.qty,
    0
  );
}

export function getTotalLiquidWeight(items: Item[]): number {
  return items.reduce((total: number, currentItem: Item) => {
    if (currentItem.liquidCapacity) {
      return total + (currentItem.liquidCapacity * currentItem.qty) / 1000;
    } else {
      return total;
    }
  }, 0);
}

export function getTotalLiquidCapacity(items: Item[]): number {
  return items.reduce((total: number, currentItem: Item) => {
    if (currentItem.liquidCapacity) {
      return total + currentItem.liquidCapacity * currentItem.qty;
    } else {
      return total;
    }
  }, 0);
}
