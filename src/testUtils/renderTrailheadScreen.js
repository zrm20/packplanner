import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import alertReducer from '../redux/alertSlice';
import categoriesReducer from '../redux/categoriesSlice';
import inventoryReducer from '../redux/inventorySlice';
import listReducer from '../redux/listSlice';
import myPackReducer from '../redux/myPackSlice';
import packsReducer from '../redux/packsSlice';
import settingsReducer from '../redux/settingsSlice';
import userReducer from '../redux/userSlice';
import { theme } from '../theme';

export { mockNavigate } from './trailheadBoundaryMocks';

export const pack = {
  id: 'pack-1',
  brand: 'Hyperlite',
  model: 'Southwest',
  capacity: 55,
  weight: 1,
};

// Worked example, kilograms. Food is base-weight exempt; bottle liquid is 2 kg.
// base = pack 1 + shelter 2 + bottle 1 = 4
// total = base + food 3 = 7
// with liquid = total + 2 = 9
export const shelter = { id: 'tent', name: 'Tent', weight: 2, category: '04' };
export const food = { id: 'dinner', name: 'Dinner', weight: 3, category: '02' };
export const bottle = {
  id: 'bottle',
  name: 'Bottle',
  weight: 1,
  category: '01',
  liquidCapacity: 2000,
};

export function renderTrailheadScreen(
  element,
  {
    packing,
    lists = [],
    categories = [],
    selectedPack = pack.id,
    items = [shelter, food, bottle],
  } = {}
) {
  const store = configureStore({
    reducer: {
      alert: alertReducer,
      categories: categoriesReducer,
      inventory: inventoryReducer,
      lists: listReducer,
      myPack: myPackReducer,
      packs: packsReducer,
      settings: settingsReducer,
      user: userReducer,
    },
    preloadedState: {
      packs: { packs: [pack], isLoading: false },
      inventory: { inventory: items, isLoading: false },
      myPack: {
        selectedPack,
        itemsInPack: packing || items.map((item) => ({ id: item.id, qty: 1, isPacked: false })),
      },
      settings: { weightUnits: 'kg', liquidUnits: 'ml' },
      lists: { lists },
      user: { user: { uid: 'test-user' }, isLoading: false, error: null },
    },
  });

  store.dispatch({ type: 'categories/setCategories', payload: { categories } });
  render(
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>{element}</SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );

  return store;
}
