import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

export default function WaterScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.totalSection}>
        <Text>TOTAL WATER</Text>
        <Text>MAX WEIGHT</Text>
      </View>
      <View style={styles.percentageSection}>
        <Text>Slider</Text>
        <Text>Percentage</Text>
        <Text>Adjusted Values</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors. color3
  },
  row: {
    flexDirection: 'row'
  },
  totalSection: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  percentageSection: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
