import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import UnitSelector from '../components/UnitSelector';
import { colors } from '../styles/globalStyles'
import { useSelector, useDispatch } from 'react-redux';
import { setWeightToMetric, setWeightToImperial, setliquidCapacityToMetric, setliquidCapacityToImperial } from '../redux/SettingsSlice'
import GenericButton from '../components/GenericButton';
import { resetToInitialState, setToDummyData } from '../redux/InventorySlice';
import { resetToInitialCategories } from '../redux/CategoriesSlice'
import { resetSettingsToInitialValues } from '../redux/SettingsSlice';
import { logLists, removeAllLists } from '../redux/ListsSlice';

export default function SettingsScreen({ navigation }) {

  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.value)

  const packs = useSelector(state => state.packs.value);
  const inventory = useSelector(state => state.inventory.value);
  const categories = useSelector(state => state.categories.value);


  //...DEV FUNCTIONS......................
  function logPacks(){
    console.log('-----PACKS-----');
    console.log(packs)
    console.log('----- END PACKS-----');
  };

  function logInventory(){
    console.log('-----INVENTORY-----');
    console.log(inventory);
    console.log('-----END INVENTORY-----');

  }

  function logCategories(){
    console.log('-----CATEGORIES-----');
    console.log(categories);
    console.log('-----END CATEGORIES-----');
  }

  function logSettings(){
    console.log('-----SETTINGS-----');
    console.log(settings);
    console.log('-----END SETTINGS-----');

  }

  function flushInventory() {
    dispatch(resetToInitialState());
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
          category='Liquid Capacity' 
          state={settings.liquidCapacityUnits} 
          setToMetric={() => dispatch(setliquidCapacityToMetric())}
          setToImperial={() => dispatch(setliquidCapacityToImperial())}
          />
       
      </View>
      <Text>DEV USE ONLY</Text>
      <GenericButton size={14} name='Packs' pressHandler={logPacks}/>
      <GenericButton size={14} name='Inventory' pressHandler={logInventory}/>
      <GenericButton size={14} name='Categories' pressHandler={logCategories}/>
      <GenericButton size={14} name='Settings' pressHandler={logSettings}/>
      <GenericButton size={14} name='Flush Inventory' pressHandler={flushInventory}/>
      <GenericButton size={14} name='Dummy Inventory' pressHandler={() => dispatch(setToDummyData())}/>
      <GenericButton size={14} name="Reset Categories" pressHandler={() => dispatch(resetToInitialCategories())} />
      <GenericButton size={14} name="Reset Settings" pressHandler={() => dispatch(resetSettingsToInitialValues())} />
      <GenericButton size={14} name="Log Lists" pressHandler={() => dispatch(logLists())} />
      <GenericButton size={14} name="Clear Lists" pressHandler={() => dispatch(removeAllLists())} />
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
