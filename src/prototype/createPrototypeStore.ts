/**
 * DISPOSABLE (#32): non-persisted Redux store hydrated from the shared fixture.
 * Avoids AsyncStorage fighting fixtures (production PersistGate whitelists myPack).
 */
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import alertReducer from '../redux/alertSlice';
import categoriesReducer from '../redux/categoriesSlice';
import inventoryReducer from '../redux/inventorySlice';
import listReducer from '../redux/listSlice';
import myPackReducer from '../redux/myPackSlice';
import packsReducer from '../redux/packsSlice';
import settingsReducer from '../redux/settingsSlice';
import userReducer from '../redux/userSlice';
import { stockCategories } from '../constants';
import { FIXTURE_ITEMS, FIXTURE_MY_PACK, FIXTURE_PACKS, PROTOTYPE_UID } from './fixtureDataset';

const rootReducer = combineReducers({
  packs: packsReducer,
  inventory: inventoryReducer,
  myPack: myPackReducer,
  settings: settingsReducer,
  categories: categoriesReducer,
  user: userReducer,
  lists: listReducer,
  alert: alertReducer,
});

export type PrototypeRootState = ReturnType<typeof rootReducer>;

export function createPrototypePreloadedState(): PrototypeRootState {
  return {
    packs: {
      packs: FIXTURE_PACKS,
      isLoading: false,
    },
    inventory: {
      inventory: FIXTURE_ITEMS,
      isLoading: false,
    },
    myPack: {
      selectedPack: FIXTURE_MY_PACK.selectedPack,
      itemsInPack: FIXTURE_MY_PACK.itemsInPack.map((entry) => ({ ...entry })),
    },
    settings: {
      weightUnits: 'kg',
      liquidUnits: 'ml',
    },
    categories: {
      categories: stockCategories,
      isLoading: false,
    },
    user: {
      user: { uid: PROTOTYPE_UID },
      isLoading: false,
      error: null,
    },
    lists: {
      lists: [],
    },
    alert: {
      alert: null,
    },
  };
}

export function createPrototypeStore() {
  return configureStore({
    reducer: rootReducer,
    preloadedState: createPrototypePreloadedState(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

export type PrototypeStore = ReturnType<typeof createPrototypeStore>;
