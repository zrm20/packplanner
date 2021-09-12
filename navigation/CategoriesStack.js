import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { globalHeaderStyle } from '../styles/globalStyles';
import EditCategoriesScreen from '../screens/EditCategoriesScreen';
import NewCategoryScreen from '../screens/NewCategoryScreen';
import EditCategoryScreen from '../screens/Edit CategoryScreen';
import ViewCategoryItems from '../screens/ViewCategoryItems';
import EditItemScreen from '../screens/EditItemScreen'
import NewItemScreen from '../screens/NewItemScreen'

const Stack = createStackNavigator();

export function CategoriesStack() {
  return (
    <Stack.Navigator  
      mode='modal'
      screenOptions={globalHeaderStyle}
    >
      <Stack.Screen name='Edit Categories' component={EditCategoriesScreen}/>
      <Stack.Screen name='Category Items' component={ViewCategoryItems}/>
      <Stack.Screen name='New Category' component={NewCategoryScreen} />
      <Stack.Screen name='Edit Category' component={EditCategoryScreen} />
      <Stack.Screen name='Edit Item' component={EditItemScreen} />
      <Stack.Screen name='New Item' component={NewItemScreen} />
    </Stack.Navigator>
  )
};
