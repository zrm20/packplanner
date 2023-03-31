import { render, screen, cleanup } from '@testing-library/react-native';
import React from 'react';
import { Platform, StatusBar } from 'react-native';

import SafeAreaScreen from './SafeAreaScreen';

describe('<SafeAreaScreen />', () => {
  const originalPlatform = Platform.OS;
  afterEach(() => {
    cleanup();
    Platform.OS = originalPlatform;
  });

  it('should have a marginTop of 0 on iOS', () => {
    Platform.OS = 'ios';

    render(<SafeAreaScreen testID="1" />);

    const component = screen.getByTestId('1');
    const baseStyle = component.props.style[0];

    expect(baseStyle.marginTop).toBe(0);
  });

  it('should have a marginTop equal to status bar height on android', () => {
    Platform.OS = 'android';

    render(<SafeAreaScreen testID="1" />);

    const component = screen.getByTestId('1');
    const baseStyle = component.props.style[0];

    expect(baseStyle.marginTop).toBe(StatusBar.currentHeight);
  });

  it('should have correct base styles, including flex 1', () => {
    render(<SafeAreaScreen testID="1" />);

    const component = screen.getByTestId('1');
    const { style } = component.props;

    expect(style[0].flex).toBe(1);
    expect(style[0].justifyContent).toBe('flex-start');
    expect(style[0].alignItems).toBe('flex-start');
  });

  it('should pass style prop to style array', () => {
    const inputStyle = { backgroundColor: 'red' };

    render(<SafeAreaScreen testID="1" style={inputStyle} />);

    const component = screen.getByTestId('1');
    const { style } = component.props;

    expect(style[1]).toBe(inputStyle);
  });

  it('should align center with alignCenter prop', () => {
    render(<SafeAreaScreen testID="1" alignCenter />);

    const component = screen.getByTestId('1');
    const { style } = component.props;

    expect(style[0].alignItems).toBe('center');
  });

  it('should justify center with justifyCenter prop', () => {
    render(<SafeAreaScreen testID="1" justifyCenter />);

    const component = screen.getByTestId('1');
    const { style } = component.props;

    expect(style[0].justifyContent).toBe('center');
  });
});
