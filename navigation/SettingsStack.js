import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { globalHeaderStyle } from '../styles/globalStyles';
import EditCategoriesScreen from '../screens/EditCategoriesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NewCategoryScreen from '../screens/NewCategoryScreen';
import EditCategoryScreen from '../screens/Edit CategoryScreen';

const Stack = createStackNavigator();

export function SettingsStack(){
  return(
    <Stack.Navigator screenOptions={globalHeaderStyle}>
      <Stack.Screen name='Settings' component={SettingsScreen}/>
    </Stack.Navigator>
  )
};