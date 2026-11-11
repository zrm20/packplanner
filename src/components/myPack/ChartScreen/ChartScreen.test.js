import { configureStore } from '@reduxjs/toolkit';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import ChartScreen from './ChartScreen';
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
        itemsInPack: items.map((item) => ({ id: item.id, qty: 1, isPacked: false })),
      },
      settings: { weightUnits: 'kg', liquidUnits: 'ml' },
    },
  });

  render(
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <ChartScreen />
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );

  return store;
}

describe('<ChartScreen />', () => {
  it('keeps pack, category totals, liquid fill, and legend shares in agreement', () => {
    renderScreen();
    expect(screen.getByText('9 kg')).toBeTruthy();
    expect(screen.getByText('33%')).toBeTruthy();
    fireEvent(screen.getByLabelText('Liquid fill level'), 'valueChange', 50);
    expect(screen.getByText('8 kg')).toBeTruthy();
    expect(screen.getByText('38%')).toBeTruthy();
    fireEvent(screen.getByLabelText('Hide liquid weight'), 'valueChange', true);
    expect(screen.getByText('7 kg')).toBeTruthy();
    expect(screen.queryByText('Liquid')).toBeNull();
    fireEvent(screen.getByLabelText('Base weight only'), 'valueChange', true);
    expect(screen.getByText('4 kg')).toBeTruthy();
    expect(screen.queryByText('Food')).toBeNull();
    expect(screen.getByText('Pack')).toBeTruthy();
    expect(screen.getByText('50%')).toBeTruthy();
  });
  it('explains an empty breakdown without dividing by zero', () => {
    renderScreen({ selectedPack: null, items: [] });
    expect(screen.getAllByText('0 kg').length).toBeGreaterThan(0);
    expect(screen.getByText(/Add gear to your pack/)).toBeTruthy();
  });
});
