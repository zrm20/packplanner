import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LockerScreen } from '../screens/LockerScreen';
import { globalHeaderStyle } from '../styles/globalStyles';

//This is a stack of screens contained on the locker tab

const Stack = createStackNavigator();

export function LockerStack(){
  return(
    <Stack.Navigator screenOptions={globalHeaderStyle}>
      <Stack.Screen name='Locker' component={LockerScreen}/>
    </Stack.Navigator>
  )
}