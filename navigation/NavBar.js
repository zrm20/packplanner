import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/globalStyles'
import { LockerStack } from './LockerStack';


function PackScreen() {
  return (
    <View style={styles.container}>
      <Text>Pack!</Text>
    </View>
  );
}

function WaterScreen() {
  return (
    <View style={styles.container}>
      <Text>Water!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings!</Text>
      <Text>Choose Units</Text>
      <Text>Adjust Weight Maximums</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Locker') {
              iconName = focused ? 'locker': 'locker';
            } else if (route.name === 'Pack') {
              iconName = focused ? 'bag-personal' : 'bag-personal';
            } else if (route.name === 'Water') {
              iconName = focused ? 'cup-water' : 'cup-water';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog';
            }

            // You can return any component that you like here!
            return(
              <MaterialCommunityIcons name={iconName} size={size} color={color} />
            )
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.white,
          inactiveTintColor: colors.white,
          activeBackgroundColor: colors.color4,
          inactiveBackgroundColor: colors.color4,
          style: { borderTopWidth: 0, backgroundColor: colors.color4}
        }}
        >
        <Tab.Screen name="Locker" component={LockerStack} />
        <Tab.Screen name="Pack" component={PackScreen} />
        <Tab.Screen name="Water" component={WaterScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color4,
    alignItems: 'center',
    justifyContent: 'center'
  }
});