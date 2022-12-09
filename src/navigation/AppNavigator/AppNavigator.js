import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "../TabNavigator/TabNavigator";
import appTabs from "./appTabs";

export default function AppNavigator({ children }) {
  return (
    <NavigationContainer>
      <TabNavigator tabs={appTabs}>
        {children}
      </TabNavigator>
    </NavigationContainer>
  );
};