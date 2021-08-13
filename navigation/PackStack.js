import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { globalHeaderStyle } from '../styles/globalStyles';
import PackScreen from '../screens/PackScreen';
import ChartsScreen from '../screens/ChartsScreen'

//This is a stack of screens contained on the pack tab

const Stack = createStackNavigator();

export function PackStack(){
  return(
    <Stack.Navigator screenOptions={globalHeaderStyle}>
      <Stack.Screen name='Pack' component={PackScreen}/>
      <Stack.Screen name='Charts' component={ChartsScreen}/>
    </Stack.Navigator>
  )
}