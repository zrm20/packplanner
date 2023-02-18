import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../archive/styles/globalStyles'

//This component is used in the New Pack and New Item page for selecting the input unit.

export default function WeightUnitSelector({ state, setState }) {
  return (
    <View>
      <Text style={styles.subHeaderText}>Unit</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={state === 'lbs' ? styles.activeButtonContainer : styles.inactiveButtonContainer}
          onPress={() => setState('lbs')}
        >
          <Text style={styles.buttonText}>lbs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={state === 'oz' ? styles.activeButtonContainer : styles.inactiveButtonContainer}
          onPress={() => setState('oz')}
        >
          <Text style={styles.buttonText}>oz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={state === 'kg' ? styles.activeButtonContainer : styles.inactiveButtonContainer}
          onPress={() => setState('kg')}
        >
          <Text style={styles.buttonText}>kg</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  inactiveButtonContainer: {
    height: 40,
    width: 40,
    borderColor: colors.color5,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color3,
    margin: 5
  },
  activeButtonContainer: {
    height: 40,
    width: 40,
    borderColor: colors.color1,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color4,
    margin: 5
  },
  subHeaderText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14
  }
});

