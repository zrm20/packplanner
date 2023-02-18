import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles'
import Slider from '@react-native-community/slider';

export default function BasicSlider({ size=20, name, value, setValue}) {
  const styles = useStyles(size);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name} ({value}%)</Text>
      <Slider
        style={{width: 15 * size, height: 2 * size}}
        value={value}
        onValueChange={setValue}
        step={1}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor={colors.color1}
        maximumTrackTintColor={colors.color5}
        />
    </View>
  )
};

const useStyles = (size) => (StyleSheet.create({
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
}));
