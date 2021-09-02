import React from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'
import { colors } from '../styles/globalStyles'

export default function BasicSwitch({ size=20, name, value, setValue}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text(size)}>{name}</Text>
      <Switch 
        value={value}
        onValueChange={setValue}
        trackColor={{true: colors.color1, false: colors.color5}}
        ios_backgroundColor={colors.color5}
        />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: (size) => ({
    color: colors.white,
    fontSize: size,
    margin: size / 4
  })
});
