import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "../TabNavigator/TabNavigator";

export default function AppNavigator({ children }) {
  return (
    <NavigationContainer>
      <TabNavigator>
        {children}
      </TabNavigator>
    </NavigationContainer>
  );
};