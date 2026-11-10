import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { WaterScreen } from '../../components/water';
import { useInventory } from '../../hooks';
import { useTheme } from '../../theme';
import CategoriesStack from '../CategoriesStack/CategoriesStack';
import LockerStack from '../LockerStack/LockerStack';
import MyPackStack from '../MyPackStack/MyPackStack';
import SettingsStack from '../SettingsStack/SettingsStack';
import { AppTabs, RootTabParamList } from '../navigation.types';

const iconSize: number = 22;
const tabBarContentHeight: number = 64;
const Tabs = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  const theme = useTheme();
  const { colors } = theme;
  const insets = useSafeAreaInsets();
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
      screenOptions: {
        tabBarLabel: 'My Pack',
        tabBarBadge: itemsInPack.length ? itemsInPack.length : undefined,
      },
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

  const styles = StyleSheet.create({
    pill: {
      width: 56,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activePill: {
      backgroundColor: colors.primary,
    },
  });

  function getScreenOptions({
    route,
  }: BottomTabScreenProps<RootTabParamList>): BottomTabNavigationOptions {
    return {
      headerShown: false,
      tabBarIcon: ({ focused }) => (
        <View style={[styles.pill, focused && styles.activePill]}>
          <MaterialCommunityIcons
            name={tabs.find((tab) => tab.name === route.name)!.iconName}
            size={iconSize}
            color={focused ? colors.onPrimary : colors.onSurfaceVariant}
          />
        </View>
      ),
      tabBarActiveTintColor: colors.onSurface,
      tabBarInactiveTintColor: colors.onSurfaceVariant,
      tabBarLabelStyle: { ...theme.fonts.labelSmall, marginTop: theme.space[1] },
      tabBarBadgeStyle: {
        backgroundColor: colors.tertiary,
        color: colors.onTertiary,
        ...theme.fonts.labelSmall,
      },
      tabBarItemStyle: { paddingTop: theme.space[2] },
      tabBarStyle: {
        height: tabBarContentHeight + insets.bottom,
        borderTopWidth: theme.borderWeight[1],
        borderTopColor: colors.outlineVariant,
        backgroundColor: colors.surface,
      },
    };
  }

  return (
    <Tabs.Navigator screenOptions={getScreenOptions}>
      {tabs.map((tab) => (
        <Tabs.Screen
          name={tab.name}
          component={tab.component}
          options={tab.screenOptions}
          key={tab.name}
        />
      ))}
    </Tabs.Navigator>
  );
}
