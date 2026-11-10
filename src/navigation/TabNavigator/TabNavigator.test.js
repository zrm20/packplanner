import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import TabNavigator from './TabNavigator';
import { theme } from '../../theme/theme';

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
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
jest.mock('../../config/firebase', () => ({ auth: {}, db: {} }));
jest.mock('camelize-ts', () => ({ __esModule: true, default: (value) => value }));
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
let mockItemsInPack = [];
jest.mock('../../hooks', () => ({
  useInventory: () => ({ itemsInPack: mockItemsInPack }),
}));
jest.mock('../LockerStack/LockerStack', () => () => null);
jest.mock('../MyPackStack/MyPackStack', () => () => null);
jest.mock('../CategoriesStack/CategoriesStack', () => () => null);
jest.mock('../SettingsStack/SettingsStack', () => () => null);
jest.mock('../../components/water', () => ({ WaterScreen: () => null }));

function renderTabs() {
  render(
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

describe('<TabNavigator />', () => {
  beforeEach(() => {
    mockItemsInPack = [];
  });

  it('should show all tabs on the screen', () => {
    renderTabs();

    expect(screen.getByText('Locker')).toBeTruthy();
    expect(screen.getByText('My Pack')).toBeTruthy();
    expect(screen.getByText('Water')).toBeTruthy();
    expect(screen.getByText('Categories')).toBeTruthy();
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('should badge My Pack with the number of items in the pack', () => {
    mockItemsInPack = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

    renderTabs();

    expect(screen.getByText('3')).toBeTruthy();
  });

  it('should not badge My Pack when the pack is empty', () => {
    renderTabs();

    expect(screen.queryByText('0')).toBeNull();
  });
});
