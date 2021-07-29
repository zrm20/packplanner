import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../styles/globalStyles'
import { AntDesign } from '@expo/vector-icons';

export default function AddButton({ pressHandler, name }) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => pressHandler()}
      >
      <AntDesign 
          name='pluscircleo'
          size={30} 
          color={colors.white} />
      <Text style={styles.buttonText}>Add {name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 15,
    borderColor: colors.color1,
    borderWidth: 4,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color3,
    margin: 5
  },
  buttonText: {
    color: colors.color2,
    fontSize: 24,
    marginHorizontal: 5
  }
});
