import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../styles/globalStyles'

//This component is used in the settings screen for selecting global settings for metric or imperial units.

export default function UnitSelector({ category, state, setToMetric, setToImperial, ...props }) {
  return (
    <View {...props} style={styles.container}>
      <Text style={styles.subHeaderText}>{category} Units</Text>
      <View style={styles.row}>
        <TouchableOpacity 
          style={state === 'metric' ? styles.activeButtonContainer : styles.inactiveButtonContainer}
          onPress={setToMetric}
          >
          <Text style={styles.buttonText}>Metric</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={state === 'imperial' ? styles.activeButtonContainer : styles.inactiveButtonContainer}
          onPress={setToImperial}
          >
          <Text style={styles.buttonText}>Imperial</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  row: {
    flexDirection: 'row'
  },
  inactiveButtonContainer: {
    height: 60,
    width: 120,
    borderColor: colors.color5,
    borderWidth: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color3,
    margin: 5
  },
  activeButtonContainer: {
    height: 60,
    width: 120,
    borderColor: colors.color1,
    borderWidth: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color4,
    margin: 5
  },
  subHeaderText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 18,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14
  }
});

