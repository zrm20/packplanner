import type { AppTheme } from '../../theme/theme';
import { baselineTheme } from './baseline';

/**
 * DISPOSABLE: direction id → AppTheme (+ optional component override map later).
 * #33–#35 register restrained / warm / expressive here without touching production App.
 */
export type PrototypeDirectionId = 'baseline' | 'restrained' | 'warm' | 'expressive';

export type PrototypeComponentOverrides = {
  // Reserved for #33–#35 reusable row/card/header swaps.
};

export type PrototypeThemeEntry = {
  theme: AppTheme;
  components?: PrototypeComponentOverrides;
};

const registry: Record<PrototypeDirectionId, PrototypeThemeEntry> = {
  baseline: { theme: baselineTheme },
  // Placeholders until direction tickets land — fall back to baseline so harness stays runnable.
  restrained: { theme: baselineTheme },
  warm: { theme: baselineTheme },
  expressive: { theme: baselineTheme },
};

export function resolvePrototypeTheme(direction: PrototypeDirectionId): PrototypeThemeEntry {
  return registry[direction] ?? registry.baseline;
}

export function isPrototypeDirectionId(value: string): value is PrototypeDirectionId {
  return value in registry;
}
