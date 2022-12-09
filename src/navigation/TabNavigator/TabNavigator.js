import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "react-native-paper";

const iconSize = 24;

const Tabs = createBottomTabNavigator();

export default function TabNavigator({ tabs = {} }) {
  const theme = useTheme();
  const { colors } = theme;

  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      <MaterialCommunityIcons
        name={tabs[route.name].iconName}
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
        Object.keys(tabs).map(tab => (
          <Tabs.Screen name={tab} component={tabs[tab].component} key={tab} />
        ))
      }
    </Tabs.Navigator>
  );
};