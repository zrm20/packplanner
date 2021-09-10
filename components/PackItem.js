import React, { useState } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors } from '../styles/globalStyles'
import { useSelector, useDispatch } from 'react-redux'
import { toggleActivePack } from '../redux/PacksSlice';
import { kgToLbsOz, kgToOz } from '../globalFunctons';

//TODO scale text


export default function PackItem({ pack, longPressHandler }) {

  const settings = useSelector((state) => state.settings.value);
  const dispatch = useDispatch();


  let convertedWeight;
  switch(settings.weightUnits){

    case("metric"): convertedWeight = pack.weight.toFixed(2) + " kg"; break;
    case("imperial"): {
      let lbsOz = kgToLbsOz(pack.weight)
      convertedWeight = `${lbsOz[0]} lbs, ${lbsOz[1].toFixed(1)} oz`;
      break;
    }
  }


  return (
    <TouchableOpacity 
      style={pack.isActivePack ? styles.activeContainer : styles.container}
      onPress={() => dispatch(toggleActivePack(pack.id))}
      onLongPress={() => longPressHandler(pack)}
      >
      <Text style={styles.brandText}>{pack.brand}</Text>
      <Text style={styles.modelText}>{pack.model}</Text>
      {pack.capacity ? <Text style={styles.dataText}>{pack.capacity} L</Text> : null}
      <Text style={styles.dataText}>{convertedWeight} {settings.weightUnit}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    marginHorizontal: 5,
    padding: 2,
    backgroundColor: colors.color4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  activeContainer: {
    height: 100,
    width: 100,
    marginHorizontal: 5,
    padding: 2,
    backgroundColor: colors.color4,
    borderColor: colors.color1,
    borderWidth: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  brandText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.color1,
    textAlign: 'center'
  },
  modelText: {
    fontSize: 14,
    color: colors.color5,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  dataText: {
    textAlign: 'center',
    fontSize: 11,
    color: colors.white
  }
});
