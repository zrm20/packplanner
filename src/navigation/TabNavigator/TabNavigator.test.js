import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import React from 'react';

import TabNavigator from './TabNavigator';

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
jest.mock('../../hooks', () => ({
  useInventory: () => ({ itemsInPack: [] }),
}));
jest.mock('../LockerStack/LockerStack', () => () => null);
jest.mock('../MyPackStack/MyPackStack', () => () => null);
jest.mock('../CategoriesStack/CategoriesStack', () => () => null);
jest.mock('../SettingsStack/SettingsStack', () => () => null);
jest.mock('../../components/water', () => ({ WaterScreen: () => null }));

describe('<TabNavigator />', () => {
  it('should show all tabs on the screen', () => {
    render(
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );

    expect(screen.getByText('Locker')).toBeTruthy();
    expect(screen.getByText('MyPack')).toBeTruthy();
    expect(screen.getByText('Water')).toBeTruthy();
    expect(screen.getByText('Categories')).toBeTruthy();
    expect(screen.getByText('Settings')).toBeTruthy();
  });
});
