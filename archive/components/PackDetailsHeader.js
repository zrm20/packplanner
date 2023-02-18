import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { kgToLbsOz } from '../globalFunctons';
import { colors } from '../styles/globalStyles'

export default function PackDetailsHeader( { activePack }) {

  const pack = activePack ? activePack : null;
  const settings = useSelector(state => state.settings.value);

  let weightString;

  if(pack){
    switch(settings.weightUnits){
      case('metric'): weightString = pack.weight.toFixed(2) + ' kg'; break;
      case('imperial'): weightString = kgToLbsOz(pack.weight)[0] + ' lbs ' + kgToLbsOz(pack.weight)[1].toFixed(0) + ' oz'; break; 
    }
  };

  return (
    <View style={styles.packDetailsWindow}>
      <Image style={styles.image} source={require('../assets/backpack-white.png')}/>
      {
        pack ? (
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.brandText}>{pack.brand}</Text>
            <Text style={styles.brandText}>{weightString}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text style={styles.detailsText}>{pack.model}</Text>
            <Text style={styles.detailsText}>|</Text>
            <Text style={styles.detailsText}>{pack.capacity} Liters</Text>
          </View>
        </View>
       
        ) :
        <View>
          <Text style={styles.detailsText}> Select a pack</Text>
          <Text style={styles.detailsText}> from the Locker Tab</Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  packDetailsWindow: {
    width: '100%',
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 18,
    marginVertical: 10,
  },
  image: {
    height: 75,
    width: 75,
    marginRight: 10
  },
  brandText: {
    color: colors.color1,
    fontSize: 24,
    margin: 5,
    fontWeight: 'bold'
  },
  detailsText: {
    color: colors.color5,
    fontSize: 16,
    margin: 5
  },
  weightBar: {
    backgroundColor: 'green',
    height: 20,
    width: '100%'
  }
});
