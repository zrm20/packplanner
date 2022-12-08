import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { globalHeaderStyle } from '../styles/globalStyles';
import WaterScreen from '../screens/WaterScreen';

//This is a stack of screens contained on the water tab

const Stack = createStackNavigator();

export function WaterStack(){
  return(
    <Stack.Navigator screenOptions={globalHeaderStyle}>
      <Stack.Screen name='Water' component={WaterScreen}/>
    </Stack.Navigator>
  )
}