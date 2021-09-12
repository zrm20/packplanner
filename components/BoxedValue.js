import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

export default function BoxedValue({ name, value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    color: colors.color5,
    textAlign: 'center'
  },
  value: {
    fontSize: 24,
    color: colors.color1,
    textAlign: 'center'
  }
});
