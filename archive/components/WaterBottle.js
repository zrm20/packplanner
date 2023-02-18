import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, pieChartColors } from '../styles/globalStyles';

export default function WaterBottle({size = 200, fill = 50}) {
  const styles = useStyles(size, fill);

  return (
    <View style={styles.container}>
      <View style={styles.cap}>

      </View>
      <View style={styles.bottleBody}>

      </View>
      <View style={styles.water}>

      </View>
    </View>
  )
};

const useStyles = (size, fill) => (StyleSheet.create({
  container: {
    margin: 25
  },
  cap: {
    backgroundColor: colors.color1,
    height: size /8,
    width: size / 8,
    marginHorizontal: ((size / 3.33) - (size / 8)) / 2,
    borderRadius: size / 40,
  },
  bottleBody: {
    height: size,
    width: size / 3.33,
    backgroundColor: colors.color5,
    borderRadius: size / 20,
    borderColor: colors.color1,
    borderWidth: size / 66.66,
  },
  water: {
    height: size * (fill / 100) - (size / 66.66),
    width: size / 3.33,
    backgroundColor: pieChartColors[0],
    borderRadius: size / 20,
    position: 'absolute',
    bottom: 0,
    borderColor: colors.color1,
    borderLeftWidth: size / 66.66,
    borderRightWidth: size / 66.66,
    borderBottomWidth: size / 66.66,
  }
}));