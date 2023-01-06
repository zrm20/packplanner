import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import { TabParamList } from "../navigation.types";
import { useInventory } from "../../hooks";
import LockerStack from "../LockerStack/LockerStack";
import { InventoryScreen } from "../../components/inventory";

const iconSize: number = 24;

const tabs = {
  "Locker": {
    name: "Locker",
    component: LockerStack,
    iconName: "locker",
    screenOptions: {}
  },
  "MyPack": {
    name: "MyPack",
    component: InventoryScreen,
    iconName: "bag-personal",
    screenOptions: {}
  },
  "Water": {
    name: "Water",
    component: InventoryScreen,
    iconName: "cup-water",
    screenOptions: {}
  },
  "Categories": {
    name: "Categories",
    component: InventoryScreen,
    iconName: "tag-multiple",
    screenOptions: {}
  },
  "Settings": {
    name: "Settings",
    component: InventoryScreen,
    iconName: "cog",
    screenOptions: {}
  },
};

const Tabs = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const theme = useTheme();
  const { colors } = theme;
  const { itemsInPack } = useInventory();

  // add a dynamic screen option to the MyPack tag to show badge with number of items in inventory
  if (tabs.MyPack) {
    tabs.MyPack.screenOptions = {
      tabBarBadge: itemsInPack.length ? itemsInPack.length : null
    }
  };

  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      <MaterialCommunityIcons
        name={tabs[route.name].iconName}
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
      backgroundColor: theme.colors.onSurface
    }
  });

  return (
    <Tabs.Navigator
      screenOptions={screenOptions}
    >
      {
        Object.keys(tabs).map(tab => (
          <Tabs.Screen name={tabs[tab].name} component={tabs[tab].component} key={tab} options={tabs[tab].screenOptions} />
        ))
      }
    </Tabs.Navigator>
  );
};