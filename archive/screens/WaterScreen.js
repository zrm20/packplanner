import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import { colors } from '../styles/globalStyles';
import WaterBottle from '../components/WaterBottle';
import BasicSlider from '../components/BasicSlider';
import { useSelector } from 'react-redux';
import { calcTotalWeight, mLToFlOz, kgToLbs, calcWaterWeight } from '../globalFunctons';
import LiquidContainerList from '../components/LiquidContainerList';
import BoxedValue from '../components/BoxedValue';

export default function WaterScreen() {

  const [waterLevel, setWaterLevel] = useState(100);
  const inventory = useSelector(state => state.inventory.value);
  const packs = useSelector(state => state.packs.value);
  const settings = useSelector(state => state.settings.value);

  //calc max liquid capacity
  let maxLiquidCapacity = 0;
  for(let i = 0; i < inventory.length; i++){
    if(inventory[i].inPack && inventory[i].liquidCapacity){
      maxLiquidCapacity += inventory[i].liquidCapacity * inventory[i].qty;
    }
  };
  const currentLiquidCapacity = (maxLiquidCapacity * (waterLevel / 100));

  //calc max and current  liquid weight
  const maxLiquidWeight = calcWaterWeight(maxLiquidCapacity);
  const currentLiquidWeight = (maxLiquidWeight * (waterLevel / 100));

  //calc max and current pack weight
  const pack = packs.filter(pack => pack.isActivePack)[0];
  const gearWeight = calcTotalWeight(inventory.filter(item => item.inPack), pack ? pack : null);
  const maxPackWeight = gearWeight + maxLiquidWeight;
  const currentPackWeight = gearWeight + currentLiquidWeight;


  //set capacity strings based on unit settings
  let maxLiquidCapacityString;
  let currentLiquidCapacityString;
  switch(settings.liquidCapacityUnits){
    case('metric'): {
      maxLiquidCapacityString = maxLiquidCapacity.toFixed(0) + ' mL';
      currentLiquidCapacityString = currentLiquidCapacity.toFixed(0) + ' mL';
      break;
    }
    case('imperial'): {
      maxLiquidCapacityString = mLToFlOz(maxLiquidCapacity).toFixed(0) + ' fl oz';
      currentLiquidCapacityString = mLToFlOz(currentLiquidCapacity).toFixed(0) + ' fl oz';
    }
  };

  //set weight strings based on unit settings
  let maxLiquidWeightString;
  let currentLiquidWeightString;
  let maxPackWeightString;
  let currentPackWeightString;
  switch(settings.weightUnits){
    case('metric'): {
      maxLiquidWeightString = maxLiquidWeight.toFixed(2) + ' kg';
      currentLiquidWeightString = currentLiquidWeight.toFixed(2) + ' kg';
      maxPackWeightString = maxPackWeight.toFixed(2) + ' kg';
      currentPackWeightString = currentPackWeight.toFixed(2) + ' kg';
      break;
    }
    case('imperial'): {
      maxLiquidWeightString = kgToLbs(maxLiquidWeight).toFixed(2) + ' lbs';
      currentLiquidWeightString = kgToLbs(currentLiquidWeight).toFixed(2) + ' lbs';
      maxPackWeightString = kgToLbs(maxPackWeight).toFixed(2) + ' lbs';
      currentPackWeightString = kgToLbs(currentPackWeight).toFixed(2) + ' lbs';
      break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.totalSection}>
        <WaterBottle fill={waterLevel}/>
        <View style={styles.list}>
          <LiquidContainerList />
        </View>
      </View>
      <View style={styles.percentageSection}>
        <BasicSlider 
          name='Liquid Fill Level'
          value={waterLevel}
          setValue={setWaterLevel}
          />
        <View style={styles.row}>
          <BoxedValue name='Max Liquid Capacity' value={maxLiquidCapacityString}/>
          <BoxedValue name='Current Liquid Capacity' value={currentLiquidCapacityString}/>
        </View>
        <View style={styles.row}>
          <BoxedValue name='Max Liquid Weight' value={maxLiquidWeightString}/>
          <BoxedValue name='Current Liquid Weight' value={currentLiquidWeightString}/>
        </View>
        <View style={styles.row}>
          <BoxedValue name='Max Pack Weight' value={maxPackWeightString}/>
          <BoxedValue name='Current Pack Weight' value={currentPackWeightString}/>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors. color3,
    padding: 5
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5
  },
  totalSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  percentageSection: {
    flex: 1,
    alignItems: 'center'
  },
  list: {
    flex: 1,
    height: 300,
  }
});
