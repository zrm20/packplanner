import React, { createContext, useContext } from 'react';

import { PROTOTYPE_PARTIAL_FILL_PERCENT } from './fixtureDataset';
import type { PrototypeQueryConfig } from './parsePrototypeQuery';

const PrototypeControlsContext = createContext<PrototypeQueryConfig>({
  direction: 'baseline',
  view: 'locker',
  waterFill: PROTOTYPE_PARTIAL_FILL_PERCENT,
  chartLiquid: PROTOTYPE_PARTIAL_FILL_PERCENT,
  editItemId: '',
  editPackId: '',
});

export function PrototypeControlsProvider({
  value,
  children,
}: {
  value: PrototypeQueryConfig;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <PrototypeControlsContext.Provider value={value}>{children}</PrototypeControlsContext.Provider>
  );
}

export function usePrototypeControls(): PrototypeQueryConfig {
  return useContext(PrototypeControlsContext);
}
