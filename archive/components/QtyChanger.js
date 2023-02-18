import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/globalStyles';

export default function QtyChanger({ state, setState}) {

  function increment(){
    setState(state + 1);
  };

  function decrement(){
    if(state > 1){
      setState(state - 1);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Qty</Text>
      <View style={styles.component}>
        <TouchableOpacity style={styles.roundButton} onPress={decrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>
          {state}
        </Text>
        <TouchableOpacity style={styles.roundButton} onPress={increment}>
          <Text style={styles.buttonText}>+</Text>
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
  label: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center'
  },
  component: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundButton: {
    backgroundColor: colors.color5, 
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  qtyText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
