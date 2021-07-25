import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../styles/globalStyles'

export default function PackScreen() {
  return (
    <View style={styles.container}>
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
