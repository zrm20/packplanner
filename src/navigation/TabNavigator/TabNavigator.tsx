import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { WaterScreen } from '../../components/water';
import { useInventory } from '../../hooks';
import CategoriesStack from '../CategoriesStack/CategoriesStack';
import LockerStack from '../LockerStack/LockerStack';
import MyPackStack from '../MyPackStack/MyPackStack';
import SettingsStack from '../SettingsStack/SettingsStack';
import { AppTabs, RootTabParamList } from '../navigation.types';

const iconSize: number = 24;
const Tabs = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
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
      component: MyPackStack,
      iconName: 'bag-personal',
      screenOptions: { tabBarBadge: itemsInPack.length ? itemsInPack.length : undefined },
    },
    {
      name: 'Water',
      component: WaterScreen,
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
        <Tabs.Screen name={tab.name} component={tab.component} key={tab.name} />
      ))}
    </Tabs.Navigator>
  );
}
