import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../styles/globalStyles';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleInPack } from '../redux/InventorySlice';
import { kgToLbs, mLToFlOz } from '../globalFunctons';

export default function InventoryItem({ item, longPressHandler }) {

  const settings = useSelector(state => state.settings.value);
  const categories = useSelector(state => state.categories.value);
  const categoryText = categories[item.category].label ? categories[item.category].label : item.category;

  const dispatch = useDispatch();

  let weightIconName;
  let displayWeight;

  switch(settings.weightUnits){
    case('metric'): {
      weightIconName = 'weight-kilogram';
      displayWeight = item.weight.toFixed(2);
      break;
    }
    case('imperial'): {
      weightIconName = 'weight-pound'
      displayWeight = kgToLbs(item.weight).toFixed(2)
    }
  };

  let waterUnit;
  let displayWater;

  switch(settings.waterCapacityUnits){
    case('metric'):{
      waterUnit = 'mL'
      displayWater = item.waterCapacity ? item.waterCapacity.toFixed(0) : null;
      break
    }
    case('imperial'):{
      waterUnit = 'fl oz';
      displayWater = item.waterCapacity ? mLToFlOz(item.waterCapacity).toFixed(1) : null;
      break;
    }
  }



  return (
    <TouchableOpacity style={styles.container} onLongPress={longPressHandler}>
      <View style={styles.infoBox}>
        <View style={styles.basicInfo}>
          <Text style={styles.categoryText}>{categoryText}</Text>
          <Text style={styles.brandText}>{item.brand}</Text>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <View style={styles.attributeInfo}>
          <View style={styles.row}>
            <MaterialCommunityIcons name={weightIconName} size={24} color={colors.white} />
            <Text style={styles.attributeText}>{displayWeight}</Text>
          </View>
          {item.category === 'water' ?
            <View style={styles.row}>
              <MaterialCommunityIcons name="water" size={24} color={colors.white} />
              <Text style={styles.attributeText}>{`${displayWater} ${waterUnit}`}</Text>
            </View>
            : null
          }
        </View>
      </View>
      <TouchableOpacity 
        style={styles.buttonBox}
        onPress={() => dispatch(toggleInPack(item.id))}
        >
        <AntDesign 
          name={!item.inPack ? 'pluscircleo' : 'minuscircleo'} 
          size={50} 
          color={item.inPack ? 'red' : colors.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 70,
    borderColor: colors.color1,
    borderWidth: 3,
    borderRadius: 12,
    padding: 5,
    flexDirection: 'row',
    marginVertical: 3
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoBox: {
    flex: 1,
    flexDirection: 'row'
  },
  basicInfo: {
    width: '50%',
  },
  attributeInfo: {
    width: '50%',
  },
  attributeText: {
    color: colors.white,
    fontSize: 16,
    margin: 3
  },
  buttonBox: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryText: {
    fontSize: 12,
    color: colors.white
  },
  brandText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.color2
  },
  nameText: {
    fontSize: 14,
    color: colors.color5
  },
});
