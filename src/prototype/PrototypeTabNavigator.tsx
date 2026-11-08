/**
 * DISPOSABLE: Tab navigator that swaps Water/Chart for prototype-controlled versions.
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { useInventory } from '../hooks';
import CategoriesStack from '../navigation/CategoriesStack/CategoriesStack';
import LockerStack from '../navigation/LockerStack/LockerStack';
import SettingsStack from '../navigation/SettingsStack/SettingsStack';
import { AppTabs, RootTabParamList } from '../navigation/navigation.types';
import PrototypeMyPackStack from './PrototypeMyPackStack';
import PrototypeWaterScreen from './PrototypeWaterScreen';

const iconSize = 24;
const Tabs = createBottomTabNavigator<RootTabParamList>();

export default function PrototypeTabNavigator(): JSX.Element {
  const theme = useTheme();
  const { colors } = theme;
  const { itemsInPack } = useInventory();

  const tabs: AppTabs = [
    {
      name: 'Locker',
      component: LockerStack,
      iconName: 'locker',
    },
    {
      name: 'MyPack',
      component: PrototypeMyPackStack,
      iconName: 'bag-personal',
      screenOptions: { tabBarBadge: itemsInPack.length ? itemsInPack.length : undefined },
    },
    {
      name: 'Water',
      component: PrototypeWaterScreen,
      iconName: 'cup-water',
    },
    {
      name: 'Categories',
      component: CategoriesStack,
      iconName: 'tag-multiple',
    },
    {
      name: 'Settings',
      component: SettingsStack,
      iconName: 'cog',
    },
  ];

  function getScreenOptions({
    route,
  }: BottomTabScreenProps<RootTabParamList>): BottomTabNavigationOptions {
    return {
      headerShown: false,
      tabBarIcon: ({ focused }) => (
        <MaterialCommunityIcons
          name={tabs.find((tab) => tab.name === route.name)!.iconName}
          size={iconSize}
          color={focused ? colors.tertiaryContainer : colors.surface}
        />
      ),
      tabBarActiveBackgroundColor: theme.colors.onSurface,
      tabBarActiveTintColor: theme.colors.tertiaryContainer,
      tabBarInactiveBackgroundColor: theme.colors.onSurface,
      tabBarInactiveTintColor: theme.colors.surface,
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.outline,
        backgroundColor: theme.colors.onSurface,
      },
    };
  }

  return (
    <Tabs.Navigator screenOptions={getScreenOptions}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={tab.screenOptions}
        />
      ))}
    </Tabs.Navigator>
  );
}
