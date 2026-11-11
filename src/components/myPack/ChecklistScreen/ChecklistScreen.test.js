// Register system-boundary mocks before loading screen modules.
import '../../../testUtils/trailheadBoundaryMocks';

import { fireEvent, screen } from '@testing-library/react-native';
import React from 'react';

import ChecklistScreen from './ChecklistScreen';
import {
  renderTrailheadScreen,
  shelter,
  food,
  bottle,
} from '../../../testUtils/renderTrailheadScreen';

function renderScreen(options = {}) {
  const items = options.items || [shelter, food, bottle];
  return renderTrailheadScreen(<ChecklistScreen />, {
    ...options,
    items,
    packing: items.map((item) => ({
      id: item.id,
      qty: item.id === 'tent' ? 2 : 1,
      isPacked: item.id === 'dinner',
    })),
  });
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
