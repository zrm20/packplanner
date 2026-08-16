import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';

import myPackReducer from '../../../redux/myPackSlice';
import packsReducer from '../../../redux/packsSlice';
import PackItem from './PackItem';

jest.mock('../../../hooks', () => ({
  usePackModel: (pack) => {
    const { useDispatch } = require('react-redux');
    const { setSelectedPack } = require('../../../redux/myPackSlice');
    const dispatch = useDispatch();

    return {
      getWeight: () => '1 lb',
      openEdit: jest.fn(),
      select: () => dispatch(setSelectedPack({ packId: pack.id })),
    };
  },
}));
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
jest.mock('./PackItem.styles', () => () => ({
  container: {},
  selectedPack: {},
  title: {},
}));

describe('<PackItem />', () => {
  it('selects the pack when pressed', () => {
    const store = configureStore({
      reducer: {
        myPack: myPackReducer,
        packs: packsReducer,
      },
    });
    const pack = { id: 'pack-1', brand: 'Test Brand', model: 'Test Model' };

    render(
      <Provider store={store}>
        <PackItem pack={pack} />
      </Provider>
    );

    fireEvent.press(screen.getByText('Test Brand'));

    expect(store.getState().myPack.selectedPack).toBe('pack-1');
  });
});
