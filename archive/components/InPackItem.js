import React, { useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { kgToLbs } from '../globalFunctons';
import { updateQty } from '../redux/InventorySlice';
import { colors } from '../styles/globalStyles'

//TODO New Feature: add swipe to delete feature

export default function InPackItem({ item }) {

  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings.value);


  function increment(){
    dispatch(updateQty({id: item.id, newQty: (item.qty + 1)}));
  }

  function decrement(){
    if(item.qty > 1){
      dispatch(updateQty({id: item.id, newQty: (item.qty - 1)}));
    }
  }

  let totalWeightString;

  switch(settings.weightUnits){
    case('metric'): totalWeightString = (item.weight * item.qty).toFixed(2) + ' kg'; break;
    case('imperial'): totalWeightString = kgToLbs(item.weight * item.qty).toFixed(2) + ' lbs'; break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.nameSection}>
        <Text numberOfLines={1} adjustsFontSizeToFit>{item.brand}</Text>
        <Text numberOfLines={1} adjustsFontSizeToFit>{item.name}</Text>
      </View>
      <View style={styles.qtySection}>
        <TouchableOpacity style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text>{item.qty}</Text>
        <TouchableOpacity style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weightSection}>
        <Text>{totalWeightString}</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1,
    paddingHorizontal: 5,
    height: 35,
    borderColor: colors.color4,
    borderBottomWidth: 1,
  },
  nameSection: {
    width: '40%'
  },
  qtySection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: colors.color4,
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 5
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  weightSection: {
    justifyContent: 'center',
    margin: 5
  }
});
