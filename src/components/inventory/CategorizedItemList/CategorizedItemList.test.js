import { configureStore } from '@reduxjs/toolkit';
import { act, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';

import categoriesReducer, { setCategories } from '../../../redux/categoriesSlice';
import CategorizedItemList from './CategorizedItemList';

jest.mock('../InventoryItem/InventoryItem', () => () => null);
jest.mock('./CategorizedItemList.styles', () => () => ({ catHeader: {} }));

const item = { id: 'item-1', category: 'custom-category', name: 'Tent', qty: 0 };

it('renders inventory before custom categories arrive and updates when they load', () => {
  const store = configureStore({ reducer: { categories: categoriesReducer } });
  render(
    <Provider store={store}>
      <CategorizedItemList data={[item]} />
    </Provider>
  );

  expect(screen.getByText('Misc')).toBeTruthy();
  act(() => {
    store.dispatch(setCategories({ categories: [{ id: 'custom-category', label: 'Shelter' }] }));
  });
  expect(screen.getByText('Shelter')).toBeTruthy();
});
