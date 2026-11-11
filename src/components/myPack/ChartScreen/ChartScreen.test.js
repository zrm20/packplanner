// Register system-boundary mocks before loading screen modules.
import '../../../testUtils/trailheadBoundaryMocks';

import { fireEvent, screen } from '@testing-library/react-native';
import React from 'react';

import ChartScreen from './ChartScreen';
import { renderTrailheadScreen } from '../../../testUtils/renderTrailheadScreen';

function renderScreen(options) {
  return renderTrailheadScreen(<ChartScreen />, options);
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
