// Register system-boundary mocks before loading screen modules.
import '../../../testUtils/trailheadBoundaryMocks';

import { act, fireEvent, screen } from '@testing-library/react-native';
import { addDoc, updateDoc } from 'firebase/firestore';
import React from 'react';

import LoadListScreen from './LoadListScreen';
import {
  renderTrailheadScreen,
  mockNavigate,
  pack,
  shelter,
} from '../../../testUtils/renderTrailheadScreen';
import EditCategoryScreen from '../../categories/EditCategoryScreen/EditCategoryScreen';
import NewCategoryScreen from '../../categories/NewCategoryScreen/NewCategoryScreen';
import NewListModal from '../NewListModal/NewListModal';

const renderScreen = renderTrailheadScreen;

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
