import { getTotalWeight, getTotalLiquidCapacity, getTotalLiquidWeight } from './inventoryUtils';

describe('inventoryUtils', () => {
  describe('getTotalWeight()', () => {
    it('should return the total weight of all items', () => {
      const items: Item[] = [
        { id: '1', name: 'Apple', weight: 1, qty: 1, isPacked: false, category: '00' },
        { id: '2', name: 'Banana', weight: 2, qty: 2, isPacked: false, category: '00' },
        { id: '3', name: 'Orange', weight: 3, qty: 3, isPacked: false, category: '00' },
      ];

      const totalWeight = getTotalWeight(items);
      expect(totalWeight).toBe(14);
    });

    it('should return 0 if the item list is empty', () => {
      const items: Item[] = [];

      const totalWeight = getTotalWeight(items);
      expect(totalWeight).toBe(0);
    });
  });

  describe('getTotalLiquidWeight()', () => {
    it('should return the total weight of all liquid items', () => {
      const items: Item[] = [
        {
          id: '1',
          name: 'Water',
          weight: 1,
          qty: 2,
          liquidCapacity: 1000,
          isPacked: false,
          category: '00',
        },
        {
          id: '2',
          name: 'Orange Juice',
          weight: 0.5,
          qty: 1,
          liquidCapacity: 500,
          isPacked: false,
          category: '00',
        },
        { id: '3', name: 'Apple', weight: 0.2, qty: 3, isPacked: false, category: '00' },
      ];

      const totalLiquidWeight = getTotalLiquidWeight(items);
      expect(totalLiquidWeight).toBe(2.5);
    });

    it('should return 0 if there are no liquid items', () => {
      const items: Item[] = [
        { id: '1', name: 'Apple', weight: 0.2, qty: 3, isPacked: false, category: '00' },
        { id: '2', name: 'Banana', weight: 0.3, qty: 2, isPacked: false, category: '00' },
        { id: '3', name: 'Orange', weight: 0.25, qty: 4, isPacked: false, category: '00' },
      ];

      const totalLiquidWeight = getTotalLiquidWeight(items);
      expect(totalLiquidWeight).toBe(0);
    });
  });

  describe('getTotalLiquidCapacity()', () => {
    it('should return the total liquid capacity of all liquid items', () => {
      const items: Item[] = [
        {
          id: '1',
          name: 'Water',
          weight: 1,
          qty: 2,
          liquidCapacity: 1000,
          isPacked: false,
          category: '00',
        },
        {
          id: '2',
          name: 'Orange Juice',
          weight: 0.5,
          qty: 1,
          liquidCapacity: 500,
          isPacked: false,
          category: '00',
        },
        { id: '3', name: 'Apple', weight: 0.2, qty: 3, isPacked: false, category: '00' },
      ];

      const totalLiquidCapacity = getTotalLiquidCapacity(items);
      expect(totalLiquidCapacity).toBe(2500);
    });

    it('should return 0 if there are no liquid items', () => {
      const items: Item[] = [
        { id: '1', name: 'Apple', weight: 0.2, qty: 3, isPacked: false, category: '00' },
        { id: '2', name: 'Banana', weight: 0.3, qty: 2, isPacked: false, category: '00' },
        { id: '3', name: 'Orange', weight: 0.25, qty: 4, isPacked: false, category: '00' },
      ];

      const totalLiquidCapacity = getTotalLiquidCapacity(items);
      expect(totalLiquidCapacity).toBe(0);
    });
  });
});
