import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "../TabNavigator/TabNavigator";
import { useAuth } from "../../hooks";
import useUser from "../../hooks/user/useUser";
import AuthNavigator from "../AuthNavigator/AuthNavigator";

export default function AppNavigator() {
  useAuth();
  const { user } = useUser();

  return (
    <NavigationContainer>
      {
        Boolean(user) ?
          <TabNavigator /> :
          <AuthNavigator />
      }
    </NavigationContainer>
  );
};