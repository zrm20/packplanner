import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { InventoryScreen } from "../../components/inventory";
import { useTheme } from "react-native-paper";

const iconSize = 24;

const appTabs = {
  "Locker": {
    component: InventoryScreen,
    iconName: "locker"
  },
  "MyPack": {
    component: InventoryScreen,
    iconName: "bag-personal"
  },
  "Water": {
    component: InventoryScreen,
    iconName: "cup-water"
  },
  "Categories": {
    component: InventoryScreen,
    iconName: "tag-multiple"
  },
  "Settings": {
    component: InventoryScreen,
    iconName: "cog"
  },
};

const Tabs = createBottomTabNavigator();

export default function TabNavigator() {
  const theme = useTheme();
  const { colors } = theme;

  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      <MaterialCommunityIcons
        name={appTabs[route.name].iconName}
        size={iconSize}
        color={focused ? colors.secondary : colors.primary}
      />
    )
  });

  return (
    <Tabs.Navigator
      screenOptions={screenOptions}
    >
      {
        Object.keys(appTabs).map(tab => (
          <Tabs.Screen name={tab} component={appTabs[tab].component} key={tab} />
        ))
      }
    </Tabs.Navigator>
  );
};