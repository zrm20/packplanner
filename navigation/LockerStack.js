import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LockerScreen } from '../screens/LockerScreen';
import { globalHeaderStyle } from '../styles/globalStyles';
import NewPackScreen from '../screens/NewPackScreen';
import NewItemScreen from '../screens/NewItemScreen';

//This is a stack of screens contained on the locker tab

const Stack = createStackNavigator();

export function LockerStack(){
  return(
    <Stack.Navigator screenOptions={globalHeaderStyle}>
      <Stack.Screen name='Locker' component={LockerScreen}/>
      <Stack.Screen name='New Pack' component={NewPackScreen}/>
      <Stack.Screen name='New Item' component={NewItemScreen}/>
    </Stack.Navigator>
  )
}