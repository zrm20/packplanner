import {
  PROTOTYPE_PARTIAL_FILL_PERCENT,
  FIXTURE_EDIT_ITEM_ID,
  FIXTURE_EDIT_PACK_ID,
  FIXTURE_LIQUID_ITEM_ID,
} from './fixtureDataset';
import {
  isPrototypeDirectionId,
  PrototypeDirectionId,
} from './themes';

export type PrototypeViewId =
  | 'locker'
  | 'mypack'
  | 'chart'
  | 'checklist'
  | 'water'
  | 'new-item'
  | 'edit-item'
  | 'edit-item-liquid'
  | 'new-pack'
  | 'edit-pack'
  | 'form-validation';

export type PrototypeQueryConfig = {
  direction: PrototypeDirectionId;
  view: PrototypeViewId;
  waterFill: number;
  chartLiquid: number;
  editItemId: string;
  editPackId: string;
};

const VIEWS = new Set<PrototypeViewId>([
  'locker',
  'mypack',
  'chart',
  'checklist',
  'water',
  'new-item',
  'edit-item',
  'edit-item-liquid',
  'new-pack',
  'edit-pack',
  'form-validation',
]);

function clampPercent(value: number, fallback: number): number {
  if (Number.isNaN(value)) return fallback;
  return Math.min(100, Math.max(0, value));
}

export function parsePrototypeQuery(search: string): PrototypeQueryConfig {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const directionRaw = params.get('direction') || 'baseline';
  const viewRaw = params.get('view') || 'locker';
  const waterFill = clampPercent(
    Number(params.get('waterFill') ?? PROTOTYPE_PARTIAL_FILL_PERCENT),
    PROTOTYPE_PARTIAL_FILL_PERCENT
  );
  const chartLiquid = clampPercent(
    Number(params.get('chartLiquid') ?? PROTOTYPE_PARTIAL_FILL_PERCENT),
    PROTOTYPE_PARTIAL_FILL_PERCENT
  );

  return {
    direction: isPrototypeDirectionId(directionRaw) ? directionRaw : 'baseline',
    view: VIEWS.has(viewRaw as PrototypeViewId) ? (viewRaw as PrototypeViewId) : 'locker',
    waterFill,
    chartLiquid,
    editItemId: params.get('itemId') || FIXTURE_EDIT_ITEM_ID,
    editPackId: params.get('packId') || FIXTURE_EDIT_PACK_ID,
  };
}

export function buildPrototypeSearch(config: Partial<PrototypeQueryConfig>): string {
  const params = new URLSearchParams();
  params.set('direction', config.direction || 'baseline');
  params.set('view', config.view || 'locker');
  if (config.waterFill != null) params.set('waterFill', String(config.waterFill));
  if (config.chartLiquid != null) params.set('chartLiquid', String(config.chartLiquid));
  if (config.editItemId) params.set('itemId', config.editItemId);
  if (config.editPackId) params.set('packId', config.editPackId);
  // edit-item-liquid convenience
  if (config.view === 'edit-item-liquid') {
    params.set('itemId', config.editItemId || FIXTURE_LIQUID_ITEM_ID);
  }
  return `?${params.toString()}`;
}
