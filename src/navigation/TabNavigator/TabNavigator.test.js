import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import TabNavigator from './TabNavigator'

// handle console warning by mocking this dependency
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('<TabNavigator />', () => {
  let appTabs;

  const TestComponent1 = () => <View testID='1' />
  const TestComponent2 = () => <View testID='2' />
  const TestComponent3 = () => <View testID='3' />

  beforeEach(() => {
    appTabs = {
      "Screen1": {
        component: TestComponent1,
        iconName: "star"
      },
      "Screen2": {
        component: TestComponent2,
        iconName: "star"
      },
      "Screen3": {
        component: TestComponent3,
        iconName: "star"
      },
    };
  });

  it('should show all tabs on the screen', () => {
    render(
      <NavigationContainer>
        <TabNavigator tabs={appTabs} />
      </NavigationContainer>
    );

    const tab1 = screen.getByText(/Screen1/);
    const tab2 = screen.getByText(/Screen2/);
    const tab3 = screen.getByText(/Screen3/);

    expect(tab1).toBeTruthy();
    expect(tab2).toBeTruthy();
    expect(tab3).toBeTruthy();
  });

  it('should render the screen1 first', () => {
    render(
      <NavigationContainer>
        <TabNavigator tabs={appTabs} />
      </NavigationContainer>
    );

    const screenComponent = screen.getByTestId("1");

    expect(screenComponent).toBeTruthy();
  });

  it('should render screen 2 when pressed', () => {
    render(
      <NavigationContainer>
        <TabNavigator tabs={appTabs} />
      </NavigationContainer>
    );

    const tab2 = screen.getByText(/Screen2/);

    fireEvent.press(tab2);
    const screen2 = screen.getByTestId('2');

    expect(screen2).toBeTruthy();
  });
});