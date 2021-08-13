import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import UnitSelector from '../components/UnitSelector';
import { colors } from '../styles/globalStyles'
import { useSelector, useDispatch } from 'react-redux';
import { setWeightToMetric, setWeightToImperial, setWaterCapacityToMetric, setWaterCapacityToImperial } from '../redux/SettingsSlice'
import GenericButton from '../components/GenericButton';

export default function SettingsScreen() {

  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.value)

  const packs = useSelector(state => state.packs.value);
  const inventory = useSelector(state => state.inventory.value);
  const categories = useSelector(state => state.categories.value);


  //...DEV FUNCTIONS......................
  function logPacks(){
    console.log('-----PACKS-----');
    console.log(packs)
  };

  function logInventory(){
    console.log('-----INVENTORY-----');
    console.log(inventory);

  }

  function logCategories(){
    console.log('-----CATEGORIES-----');
    console.log(categories);
  }

  function logSettings(){
    console.log('-----SETTINGS-----');
    console.log(settings);

  }
  //...END DEV FUNCTIONS................

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Units</Text>
      <View>
        <UnitSelector 
          category='Weight' 
          state={settings.weightUnits} 
          setToMetric={() => dispatch(setWeightToMetric())}
          setToImperial={() => dispatch(setWeightToImperial())}
          />
        <UnitSelector 
          category='Water Capacity' 
          state={settings.waterCapacityUnits} 
          setToMetric={() => dispatch(setWaterCapacityToMetric())}
          setToImperial={() => dispatch(setWaterCapacityToImperial())}
          />
      </View>
      <Text>DEV USE ONLY</Text>
      <GenericButton size={14} name='Packs' pressHandler={logPacks}/>
      <GenericButton size={14} name='Inventory' pressHandler={logInventory}/>
      <GenericButton size={14} name='Categories' pressHandler={logCategories}/>
      <GenericButton size={14} name='Settings' pressHandler={logSettings}/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color3
  },
  headerText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold'
  },
  
});
