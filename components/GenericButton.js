import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../styles/globalStyles'
import { AntDesign } from '@expo/vector-icons';

export default function GenericButton({ pressHandler, name, size=24}) {
  return (
    <TouchableOpacity 
      style={styles.container(size)}
      onPress={() => pressHandler()}
      >
      <Text style={styles.buttonText(size)}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: (size) => ({
    height: (size * 3),
    paddingHorizontal: (size * .625),
    borderColor: colors.color1,
    borderWidth: (size * .1666666),
    borderRadius: (size * .6),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color3,
    margin: (size * .25)
  }),
  buttonText: (size) => ({
    color: colors.color2,
    fontSize: size,
    marginHorizontal: (size * .25)
  })
});
