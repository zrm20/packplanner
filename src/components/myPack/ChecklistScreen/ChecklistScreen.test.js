import { configureStore } from '@reduxjs/toolkit';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import ChecklistScreen from './ChecklistScreen';
import alertReducer from '../../../redux/alertSlice';
import categoriesReducer from '../../../redux/categoriesSlice';
import inventoryReducer from '../../../redux/inventorySlice';
import listReducer from '../../../redux/listSlice';
import myPackReducer from '../../../redux/myPackSlice';
import packsReducer from '../../../redux/packsSlice';
import settingsReducer from '../../../redux/settingsSlice';
import userReducer from '../../../redux/userSlice';
import { theme } from '../../../theme';

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn(() => ({})),
  deleteDoc: jest.fn(),
  doc: jest.fn(() => ({})),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  onSnapshot: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signInAnonymously: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));
jest.mock('../../../config/firebase', () => ({ auth: {}, db: {} }));
jest.mock('camelize-ts', () => ({ __esModule: true, default: (value) => value }));
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({ navigate: mockNavigate, goBack: jest.fn() }),
  };
});

const pack = {
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
const shelter = { id: 'tent', name: 'Tent', weight: 2, category: '04' };
const food = { id: 'dinner', name: 'Dinner', weight: 3, category: '02' };
const bottle = {
  id: 'bottle',
  name: 'Bottle',
  weight: 1,
  category: '01',
  liquidCapacity: 2000,
};

function renderScreen({ selectedPack = pack.id, items = [shelter, food, bottle] } = {}) {
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
        itemsInPack: items.map((item) => ({
          id: item.id,
          qty: item.id === 'tent' ? 2 : 1,
          isPacked: item.id === 'dinner',
        })),
      },
      settings: { weightUnits: 'kg', liquidUnits: 'ml' },
    },
  });

  render(
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <ChecklistScreen />
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );

  return store;
}

describe('<ChecklistScreen />', () => {
  it('filters packed gear without changing quantities, order, or progress', () => {
    const store = renderScreen();
    const before = store.getState().myPack;
    expect(screen.getByText('1 of 3 packed')).toBeTruthy();
    expect(screen.getByText('×2')).toBeTruthy();
    fireEvent.press(screen.getByText('Remaining'));
    expect(screen.queryByText('Dinner')).toBeNull();
    expect(screen.getByText('Tent')).toBeTruthy();
    expect(screen.getByText('1 of 3 packed')).toBeTruthy();
    fireEvent.press(screen.getByText('Packed'));
    expect(screen.getByText('Dinner')).toBeTruthy();
    expect(screen.queryByText('Tent')).toBeNull();
    fireEvent.press(screen.getByText('All'));
    expect(screen.getByText('Tent')).toBeTruthy();
    expect(store.getState().myPack).toEqual(before);
  });
  it('updates progress while checking gear in the remaining filter and explains completion', () => {
    renderScreen();
    fireEvent.press(screen.getByText('Remaining'));
    fireEvent.press(screen.getByLabelText('Pack Tent'));
    expect(screen.getByText('2 of 3 packed')).toBeTruthy();
    expect(screen.queryByText('Tent')).toBeNull();
    fireEvent.press(screen.getByLabelText('Pack Bottle'));
    expect(screen.getByText('3 of 3 packed')).toBeTruthy();
    expect(screen.getByText('Everything is packed. Happy trails.')).toBeTruthy();
    fireEvent.press(screen.getByText('All'));
    expect(screen.getByText('×2')).toBeTruthy();
    expect(screen.getByLabelText('Pack Tent').props.accessibilityState.checked).toBe(true);
  });

  it('explains an empty checklist without requiring a selected pack', () => {
    renderScreen({ selectedPack: null, items: [] });
    expect(screen.getByText('0 of 0 packed')).toBeTruthy();
    expect(screen.getByText(/No gear to check off/)).toBeTruthy();
  });
});
