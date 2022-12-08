import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/globalStyles'
import { LockerStack } from './LockerStack';
import { PackStack } from './PackStack';
import { WaterStack } from './WaterStack';
import { SettingsStack } from './SettingsStack';
import { CategoriesStack } from './CategoriesStack';

const Tab = createBottomTabNavigator();

export function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Locker') {
              iconName = focused ? 'locker': 'locker';
            } else if (route.name === 'Pack') {
              iconName = focused ? 'bag-personal' : 'bag-personal';
            } else if (route.name === 'Water') {
              iconName = focused ? 'cup-water' : 'cup-water';
            } else if (route.name === 'Categories') {
              iconName = focused ? 'animation' : 'animation';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog';
            }

            // You can return any component that you like here!
            return(
              <MaterialCommunityIcons name={iconName} size={size} color={color} />
            )
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.color1,
          inactiveTintColor: colors.white,
          activeBackgroundColor: colors.color4,
          inactiveBackgroundColor: colors.color4,
          style: { borderTopWidth: 0, backgroundColor: colors.color4}
        }}
        >
        <Tab.Screen name="Locker" component={LockerStack} />
        <Tab.Screen name="Pack" component={PackStack} />
        <Tab.Screen name="Water" component={WaterStack} />
        <Tab.Screen name="Categories" component={CategoriesStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}