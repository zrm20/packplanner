import {
  FIXTURE_ITEMS,
  FIXTURE_MY_PACK,
  FIXTURE_PACKS,
  LOCKER_EXPECTED_LABELS,
  PROTOTYPE_UID,
  getFixturePackedItem,
} from './fixtureDataset';
import { getTotalLiquidWeight, getTotalWeight } from '../utils/inventoryUtils/inventoryUtils';

describe('prototype fixture dataset', () => {
  it('exposes multiple packs and Locker labels for screenshots', () => {
    expect(FIXTURE_PACKS.length).toBeGreaterThanOrEqual(2);
    for (const brand of LOCKER_EXPECTED_LABELS.packBrands) {
      expect(FIXTURE_PACKS.some((pack) => pack.brand === brand)).toBe(true);
    }
    for (const name of LOCKER_EXPECTED_LABELS.itemNames) {
      expect(FIXTURE_ITEMS.some((item) => item.name.includes(name))).toBe(true);
    }
    expect(
      FIXTURE_ITEMS.some((item) => item.name.includes(LOCKER_EXPECTED_LABELS.longNameFragment))
    ).toBe(true);
  });

  it('includes liquid containers and a partly completed checklist', () => {
    const liquids = FIXTURE_ITEMS.filter((item) => item.liquidCapacity);
    expect(liquids.length).toBeGreaterThanOrEqual(2);

    const packed = FIXTURE_MY_PACK.itemsInPack;
    expect(packed.some((entry) => entry.isPacked)).toBe(true);
    expect(packed.some((entry) => !entry.isPacked)).toBe(true);
    expect(packed.some((entry) => entry.qty > 1)).toBe(true);
  });

  it('keeps liquid weight consistent with capacity × qty (kg)', () => {
    const inPack = FIXTURE_MY_PACK.itemsInPack.map((entry) => getFixturePackedItem(entry.id));
    const liquids = inPack.filter((item) => item.liquidCapacity);
    // 1 ml ≈ 1 g → kg = ml * qty / 1000
    const expected = liquids.reduce(
      (sum, item) => sum + (item.liquidCapacity * item.qty) / 1000,
      0
    );
    expect(getTotalLiquidWeight(liquids)).toBeCloseTo(expected, 5);
    expect(getTotalWeight(inPack)).toBeGreaterThan(0);
  });

  it('uses a single synthetic uid for residual auth-shaped fields', () => {
    expect(PROTOTYPE_UID).toBe('prototype-guest');
  });
});
