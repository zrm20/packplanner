import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, Keyboard, TouchableOpacity } from 'react-native'
import { colors } from '../styles/globalStyles'
import { useSelector, useDispatch } from 'react-redux';
import WeightUnitSelector from '../components/WeightUnitSelector';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddButton from '../components/AddButton'
import CategoryPicker from '../components/CategoryPicker';
import { addItem } from '../redux/InventorySclice';
import WaterUnitSelector from '../components/WaterUnitSelector';
import { lbsToKg, ozToKg, flOzToML } from '../globalFunctons';

export default function NewPackScreen( { navigation }) {

  const [icon, setIcon] = useState('head-question');
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState('food');
  const [weight, setWeight] = useState();
  const [waterCapacity, setWaterCapacity] = useState();
  //unit for input weight. Should be lbs, oz, or kg
  const [weightUnits, setWeightUnits] = useState('lbs');
  const [waterCapacityUnits, setWaterCapacityUnits]= useState('fl oz');
  
  const dispatch = useDispatch();
  
  function addNewItem(){
    let kgWeight;

    switch(weightUnits){
        case('kg'): kgWeight = weight; break;
        case('lbs'): kgWeight = lbsToKg(weight); break;
        case('oz'): kgWeight = ozToKg(weight); break;
      };

    const adjustedCapacity = waterCapacityUnits === 'mL' ? waterCapacity : flOzToML(waterCapacity);

    let newItem = {
      category: category,
      brand: brand,
      name: name,
      weight: kgWeight,
      inPack: false
    }

    if(category === 'water'){
      newItem.waterCapacity=adjustedCapacity
    }

    dispatch(addItem(newItem));
    navigation.navigate('Locker');
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => Keyboard.dismiss()} activeOpacity={1}>
      <View style={styles.iconHeader}>
        <CategoryPicker state={category} setState={setCategory}/>
        <MaterialCommunityIcons name={icon} size={60} color={colors.color5} />
      </View>

      <View style={styles.formItem}>
        <Text style={styles.labelText}>Brand</Text>
        <TextInput 
          style={styles.textInput}
          maxLength={30}
          placeholder="Item Brand"
          onChangeText={setBrand}
          value={brand}
        />
      </View>

      <View style={styles.formItem}>
        <Text style={styles.labelText}>Name</Text>
        <TextInput 
          style={styles.textInput}
          maxLength={45}
          placeholder="Item Name"
          onChangeText={setName}
          value={name}
        />
      </View>
      
      <View style={styles.row}>
        <View style={styles.formItem}>
          <Text style={styles.labelText}>Weight</Text>
          <TextInput 
            style={styles.numberInput}
            onChangeText={value => setWeight(Number(value))}
            value={weight}
            keyboardType='numeric'
            placeholder={weightUnits}
          />
        </View>
        <WeightUnitSelector state={weightUnits} setState={setWeightUnits}/>
      </View>

      {category === 'water' ? 
      <View style={styles.row}>
        <View style={styles.formItem}>
          <Text style={styles.labelText}>Water Capactiy</Text>
          <TextInput 
            style={styles.numberInput}
            keyboardType='numeric'
            placeholder={waterCapacityUnits}
            onChangeText={value => setWaterCapacity(Number(value))}
          />
        </View>
        <WaterUnitSelector state={waterCapacityUnits} setState={setWaterCapacityUnits}/>
      </View>
      : null
      }
      
      <AddButton name='Item' pressHandler={addNewItem}/>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color3,
    padding: 20
  },
  iconHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  labelText: {
    color: colors.color2,
    fontSize: 24,
    
  },
  textInput: {
    width: '90%',
    height: 40,
    backgroundColor: colors.white
  },
  numberInput: {
    width: 100,
    height: 50,
    backgroundColor: colors.white
  },
  formItem: {
    marginVertical: 5,
    marginHorizontal: 10
  }
});
