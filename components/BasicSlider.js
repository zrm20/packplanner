import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles'
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default function BasicSlider({ size=20, name, value, setValue}) {

  return (
    <View style={styles.container}>
      <Text style={styles.text(size)}>{name} ({value}%)</Text>
      {/* <MultiSlider 
        value={value}
        min={0}
        max={100}
        onValuesChangeFinish={setValue}
        selectedStyle={styles.selectedSlider(size)}
        unselectedStyle={styles.unselectedSlider(size)}
        
        /> */}
        
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    margin: 2,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: (size) => ({
    fontSize: size,
    color: colors.white
  }),
  selectedSlider: (size) => ({
    backgroundColor: colors.color1,
    height: size / 4
  }),
  unselectedSlider: (size) => ({
    backgroundColor: colors.color5,
    height: size / 4
  })
});
