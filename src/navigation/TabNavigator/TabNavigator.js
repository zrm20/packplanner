import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { InventoryScreen } from "../../components/inventory";

const appTabs = [
  {
    name: 'Locker',
    component: InventoryScreen
  },
  {
    name: 'Settings',
    component: () => null
  }
];

const Tabs = createBottomTabNavigator();

const screenOptions = {
  headerShown: false
};

export default function TabNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={screenOptions}
    >
      {
        appTabs.map(tab => (
          <Tabs.Screen name={tab.name} component={tab.component} key={tab.name} />
        ))
      }
    </Tabs.Navigator>
  );
};