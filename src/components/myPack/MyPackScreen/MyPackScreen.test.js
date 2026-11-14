import { configureStore } from '@reduxjs/toolkit';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import MyPackScreen from './MyPackScreen';
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
    useNavigation: () => ({ navigate: mockNavigate }),
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
          <MyPackScreen />
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );

  return store;
}

describe('<MyPackScreen />', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('shows pack identity with base weight as the headline and total, liquid, and capacity beside it', () => {
    renderScreen();

    expect(screen.getByText('Hyperlite')).toBeTruthy();
    expect(screen.getByText('Southwest')).toBeTruthy();
    expect(screen.getByText('Base weight')).toBeTruthy();
    expect(screen.getByText('4')).toBeTruthy();
    expect(screen.getByText('kg')).toBeTruthy();
    expect(screen.getByText('Total')).toBeTruthy();
    expect(screen.getByText('7 kg')).toBeTruthy();
    expect(screen.getByText('With liquid')).toBeTruthy();
    expect(screen.getByText('9 kg')).toBeTruthy();
    expect(screen.getByText('Capacity')).toBeTruthy();
    expect(screen.getByText('55 L')).toBeTruthy();
  });

  it('keeps breakdown, checklist, save, load, and empty available as labeled actions', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    renderScreen();

    fireEvent.press(screen.getByText('Breakdown'));
    expect(mockNavigate).toHaveBeenCalledWith('MyPack', { screen: 'Chart' });

    fireEvent.press(screen.getByText('Checklist'));
    expect(mockNavigate).toHaveBeenCalledWith('MyPack', { screen: 'Checklist' });

    fireEvent.press(screen.getByText('Load list'));
    expect(mockNavigate).toHaveBeenCalledWith('MyPack', { screen: 'Lists' });

    fireEvent.press(screen.getByText('Empty'));
    expect(alertSpy).toHaveBeenCalledWith(
      'Are you sure?',
      'Are you sure you want to remove all items from your pack?',
      expect.any(Array),
      undefined
    );
    const remove = alertSpy.mock.calls[0][2].find((button) => button.text === 'Remove');
    await act(async () => {
      await remove.onPress();
    });
    expect(screen.getByText('No Items in Pack')).toBeTruthy();

    fireEvent.press(screen.getByText('Save list'));
    expect(screen.getByText('Save your current pack as a list.')).toBeTruthy();

    alertSpy.mockRestore();
  });

  it('updates the single totals summary when item quantities change', () => {
    renderScreen();

    // Bottle is in the first category. A second bottle adds 1 kg of gear and 2 kg of liquid.
    fireEvent.press(screen.getAllByLabelText('Increase quantity')[0]);

    expect(screen.getAllByText('Total')).toHaveLength(1);
    expect(screen.getAllByText('With liquid')).toHaveLength(1);
    expect(screen.getAllByText('Capacity')).toHaveLength(1);
    expect(screen.getByText('8 kg')).toBeTruthy();
    expect(screen.getByText('12 kg')).toBeTruthy();
    expect(screen.getByText('55 L')).toBeTruthy();

    fireEvent.press(screen.getAllByLabelText('Decrease quantity')[0]);

    expect(screen.getByText('7 kg')).toBeTruthy();
    expect(screen.getByText('9 kg')).toBeTruthy();
  });

  it('explains how to choose a pack when none is selected', () => {
    renderScreen({ selectedPack: null });

    expect(screen.getByText('No Pack Selected')).toBeTruthy();
    expect(screen.getByText('Select a pack by tapping on a pack in the Locker Tab')).toBeTruthy();
    expect(screen.queryByText('Hyperlite')).toBeNull();
    expect(screen.queryByText('Southwest')).toBeNull();
    expect(screen.getByText('—')).toBeTruthy();
    expect(screen.getByText('Breakdown')).toBeTruthy();
  });

  it('stays usable when the selected pack has no items', () => {
    renderScreen({ items: [] });

    expect(screen.getByText('Hyperlite')).toBeTruthy();
    expect(screen.getByText('Southwest')).toBeTruthy();
    expect(screen.getByText('No Items in Pack')).toBeTruthy();
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getAllByText('1 kg')).toHaveLength(2);
    expect(screen.getByText('55 L')).toBeTruthy();
    expect(screen.getByText('Empty')).toBeTruthy();
  });
});
