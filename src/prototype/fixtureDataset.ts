/**
 * DISPOSABLE (#32): shared deterministic gear fixture for redesign prototypes.
 * Single source for Locker / My Pack / chart / checklist / water / form screenshots.
 */

export const PROTOTYPE_UID = 'prototype-guest';

/** Partial water / chart fill used by the capture matrix unless overridden. */
export const PROTOTYPE_PARTIAL_FILL_PERCENT = 45;

export const FIXTURE_PACKS: PackData[] = [
  {
    id: 'pack-osprey-exos',
    brand: 'Osprey',
    model: 'Exos 58',
    capacity: 58,
    weight: 1.28,
  },
  {
    id: 'pack-gossamer-mariposa',
    brand: 'Gossamer Gear',
    model: 'Mariposa 60',
    capacity: 60,
    weight: 0.87,
  },
  {
    id: 'pack-ula-circuit',
    brand: 'ULA',
    model: 'Circuit',
    capacity: 68,
    weight: 0.99,
  },
];

/**
 * Weights in kg; liquidCapacity in ml. Category ids match stock categories.
 * Includes shared generic names (Jacket), a long name, liquids, and varied qty via myPack.
 */
export const FIXTURE_ITEMS: ItemData[] = [
  {
    id: 'item-smartwater',
    brand: 'smartwater',
    name: '1L Bottle',
    weight: 0.038,
    liquidCapacity: 1000,
    category: '01',
  },
  {
    id: 'item-nalgene',
    brand: 'Nalgene',
    name: 'Wide Mouth Bottle',
    weight: 0.178,
    liquidCapacity: 1000,
    category: '01',
  },
  {
    id: 'item-be-free',
    brand: 'Katadyn',
    name: 'BeFree Filter Flask',
    weight: 0.063,
    liquidCapacity: 1000,
    category: '01',
  },
  {
    id: 'item-dinner',
    brand: 'Mountain House',
    name: 'Beef Stroganoff',
    weight: 0.132,
    category: '02',
  },
  {
    id: 'item-fuel',
    brand: 'MSR',
    name: 'IsoPro Canister',
    weight: 0.37,
    category: '03',
  },
  {
    id: 'item-tent',
    brand: 'Big Agnes',
    name: 'Copper Spur HV UL2',
    weight: 1.19,
    category: '04',
  },
  {
    id: 'item-jacket-or',
    brand: 'Outdoor Research',
    name: 'Jacket',
    weight: 0.312,
    category: '05',
  },
  {
    id: 'item-jacket-patagonia',
    brand: 'Patagonia',
    name: 'Jacket',
    weight: 0.289,
    category: '05',
  },
  {
    id: 'item-stove',
    brand: 'TOAKS',
    name: 'Titanium Siphon Alcohol Stove',
    weight: 0.045,
    category: '06',
  },
  {
    id: 'item-knife',
    brand: 'Morakniv',
    name: 'Companion',
    weight: 0.116,
    category: '07',
  },
  {
    id: 'item-map',
    brand: 'National Geographic',
    name: 'Trails Illustrated Topographic Map of the High Sierra Wilderness Area',
    weight: 0.085,
    category: '08',
  },
  {
    id: 'item-first-aid',
    brand: 'Adventure Medical',
    name: 'Ultralight / Watertight .7',
    weight: 0.17,
    category: '09',
  },
  {
    id: 'item-powerbank',
    brand: 'Nitecore',
    name: 'NB10000',
    weight: 0.15,
    category: '10',
  },
  {
    id: 'item-stuff-sack',
    brand: 'Hyperlite Mountain Gear',
    name: 'Ultralight Dyneema Stuff Sack With Extra Long Descriptive Name',
    weight: 0.028,
    category: '00',
  },
];

/** Partly completed checklist: mix of isPacked true/false among items in pack. */
export const FIXTURE_MY_PACK: MyPackSliceState = {
  selectedPack: 'pack-osprey-exos',
  itemsInPack: [
    { id: 'item-smartwater', qty: 2, isPacked: true },
    { id: 'item-nalgene', qty: 1, isPacked: false },
    { id: 'item-be-free', qty: 1, isPacked: true },
    { id: 'item-dinner', qty: 3, isPacked: false },
    { id: 'item-fuel', qty: 1, isPacked: true },
    { id: 'item-tent', qty: 1, isPacked: true },
    { id: 'item-jacket-or', qty: 1, isPacked: false },
    { id: 'item-stove', qty: 1, isPacked: true },
    { id: 'item-knife', qty: 1, isPacked: false },
    { id: 'item-map', qty: 1, isPacked: true },
    { id: 'item-first-aid', qty: 1, isPacked: false },
    { id: 'item-powerbank', qty: 1, isPacked: true },
    { id: 'item-stuff-sack', qty: 2, isPacked: false },
  ],
};

/** Liquid item used for edit-item--liquid screenshots. */
export const FIXTURE_LIQUID_ITEM_ID = 'item-smartwater';

/** Packed item used when opening edit from inventory (non-liquid). */
export const FIXTURE_EDIT_ITEM_ID = 'item-jacket-or';

export const FIXTURE_EDIT_PACK_ID = 'pack-osprey-exos';

export function getFixtureItem(id: string): ItemData {
  const item = FIXTURE_ITEMS.find((entry) => entry.id === id);
  if (!item) {
    throw new Error(`Unknown fixture item: ${id}`);
  }
  return item;
}

export function getFixturePack(id: string): PackData {
  const pack = FIXTURE_PACKS.find((entry) => entry.id === id);
  if (!pack) {
    throw new Error(`Unknown fixture pack: ${id}`);
  }
  return pack;
}

export function getFixturePackedItem(id: string): Item {
  const base = getFixtureItem(id);
  const packed = FIXTURE_MY_PACK.itemsInPack.find((entry) => entry.id === id);
  return {
    ...base,
    qty: packed?.qty ?? 0,
    isPacked: packed?.isPacked ?? false,
  };
}

/** Labels the Locker screenshot must show (independent of implementation). */
export const LOCKER_EXPECTED_LABELS = {
  packBrands: ['Osprey', 'Gossamer Gear', 'ULA'] as const,
  itemNames: ['Jacket', '1L Bottle', 'Copper Spur HV UL2'] as const,
  longNameFragment: 'Extra Long Descriptive Name',
};
