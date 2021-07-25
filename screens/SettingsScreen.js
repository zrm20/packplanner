import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles'

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color3
  }
});
