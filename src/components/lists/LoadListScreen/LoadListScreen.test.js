import { configureStore } from '@reduxjs/toolkit';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import LoadListScreen from './LoadListScreen';
import NewListModal from '../NewListModal/NewListModal';
import NewCategoryScreen from '../../categories/NewCategoryScreen/NewCategoryScreen';
import EditCategoryScreen from '../../categories/EditCategoryScreen/EditCategoryScreen';
import { addDoc, updateDoc } from 'firebase/firestore';
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
  writeBatch: jest.fn(() => ({ update: jest.fn(), delete: jest.fn(), commit: jest.fn() })),
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
    useNavigation: () => ({ navigate: mockNavigate, goBack: mockNavigate }),
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

function renderScreen(
  element,
  { lists = [], categories = [], selectedPack = pack.id, items = [shelter, food, bottle] } = {}
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
        itemsInPack: items.map((item) => ({ id: item.id, qty: 1, isPacked: false })),
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

const navigation = { goBack: mockNavigate, navigate: mockNavigate };

beforeEach(() => {
  jest.clearAllMocks();
});

it('saves the named list with the current pack contents and cancels without saving', async () => {
  const toggle = jest.fn();
  const view = renderScreen(<NewListModal visible toggleVisibility={toggle} />);
  expect(screen.getByText('Hyperlite Southwest')).toBeTruthy();
  fireEvent.press(screen.getByText('Cancel'));
  expect(toggle).toHaveBeenCalledTimes(1);
  expect(addDoc).not.toHaveBeenCalled();
  fireEvent.changeText(screen.getByLabelText('List Name'), 'Weekend');
  await act(async () => {
    fireEvent.press(screen.getByText('Save'));
  });
  expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
    name: 'Weekend',
    uid: 'test-user',
    myPackState: view.getState().myPack,
  });
  expect(toggle).toHaveBeenCalledTimes(2);
});

it('loads saved quantities and packed state, then returns to My Pack', () => {
  const list = {
    id: 'list',
    name: 'Overnight',
    myPackState: {
      selectedPack: pack.id,
      itemsInPack: [{ id: shelter.id, qty: 3, isPacked: true }],
    },
  };
  const store = renderScreen(<LoadListScreen navigation={navigation} />, { lists: [list] });
  expect(screen.getByText('Overnight')).toBeTruthy();
  expect(screen.getByText('1 items')).toBeTruthy();
  fireEvent.press(screen.getByText('Load list'));
  expect(store.getState().myPack).toEqual(list.myPackState);
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});

it('creates a category using the selected icon, name, and exemption', async () => {
  renderScreen(<NewCategoryScreen navigation={navigation} />);
  fireEvent.changeText(screen.getByLabelText('Category Name'), 'Trail kit');
  fireEvent.press(screen.getByLabelText('Select campfire icon'));
  fireEvent(screen.getByRole('switch'), 'valueChange', true);
  await act(async () => {
    fireEvent.press(screen.getByRole('button', { name: 'Add category' }));
  });
  expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
    label: 'Trail kit',
    icon: 'campfire',
    isBaseWeightExempt: true,
    uid: 'test-user',
  });
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});

it('keeps editing values and can find and persist an icon beyond the prototype subset', async () => {
  const category = { id: 'custom', label: 'Trail kit', icon: 'campfire', isBaseWeightExempt: true };
  renderScreen(
    <EditCategoryScreen navigation={navigation} route={{ params: { categoryId: category.id } }} />,
    { categories: [category] }
  );
  expect(screen.getByDisplayValue('Trail kit')).toBeTruthy();
  fireEvent.changeText(screen.getByPlaceholderText('Icon search'), 'horse');
  fireEvent.press(screen.getByLabelText('Select horse icon'));
  await act(async () => {
    fireEvent.press(screen.getByText('Save changes'));
  });
  expect(updateDoc).toHaveBeenCalledWith(expect.anything(), {
    label: 'Trail kit',
    icon: 'horse',
    isBaseWeightExempt: true,
  });
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});
