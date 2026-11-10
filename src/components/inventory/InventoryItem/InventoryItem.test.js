import { render, screen } from '@testing-library/react-native';
import React from 'react';

import InventoryItem from './InventoryItem';

jest.mock('../../../hooks', () => ({
  useItemModel: (item) => ({
    ...item,
    category: { id: item.category, label: 'Shelter' },
    getWeight: () => '1.2 lb',
    getLiquidCapacity: () => '',
    addToPack: jest.fn(),
    openEdit: jest.fn(),
  }),
}));
jest.mock('./InventoryItem.styles', () => () => ({
  container: {},
  textContainer: {},
  weightContainer: {},
  leftContainer: {},
  addButton: {},
  name: {},
  brand: {},
  weight: {},
  liquid: {},
}));
jest.mock('../QtyChanger/QtyChanger', () => () => null);

describe('<InventoryItem />', () => {
  it('leads with the item name and shows brand as secondary detail', () => {
    const item = {
      id: 'item-1',
      name: 'Duplex Tent',
      brand: 'Zpacks',
      weight: 0.539,
      category: '04',
      qty: 0,
      isPacked: false,
    };

    render(<InventoryItem item={item} />);

    expect(screen.getByText('Duplex Tent')).toBeTruthy();
    expect(screen.getByText('Zpacks')).toBeTruthy();

    const tree = JSON.stringify(screen.toJSON());
    expect(tree.indexOf('Duplex Tent')).toBeLessThan(tree.indexOf('Zpacks'));
  });
});
