import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors } from '../styles/globalStyles'

export default function NewPackItem({ pack, pressHandler }) {

  return (
    <TouchableOpacity onPress={pressHandler} style={styles.container}>
      <Text style={styles.text}>Add New</Text>
      <Text style={styles.text}>+</Text>
      <Text style={styles.text}>Pack</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    marginHorizontal: 5,
    padding: 2,
    backgroundColor: colors.color5,
    borderColor: colors.color2,
    borderWidth: 3,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
