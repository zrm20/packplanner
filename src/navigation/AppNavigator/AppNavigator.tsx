import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "../TabNavigator/TabNavigator";
import { useAuth } from "../../hooks";

export default function AppNavigator() {
  useAuth();

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};