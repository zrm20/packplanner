import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { useAuth, useSubscribeToFirestore } from '../../hooks';
import useUser from '../../hooks/user/useUser';
import AuthNavigator from '../AuthNavigator/AuthNavigator';
import TabNavigator from '../TabNavigator/TabNavigator';

export default function AppNavigator() {
  useAuth();
  useSubscribeToFirestore();
  const { user } = useUser();

  return <NavigationContainer>{user ? <TabNavigator /> : <AuthNavigator />}</NavigationContainer>;
}
