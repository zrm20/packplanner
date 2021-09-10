import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, Keyboard, TouchableOpacity, Image } from 'react-native'
import { colors } from '../styles/globalStyles'
import { useDispatch, useSelector } from 'react-redux';
import WeightUnitSelector from '../components/WeightUnitSelector';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddButton from '../components/AddButton'
import CategoryPicker from '../components/CategoryPicker';
import { addItem } from '../redux/InventorySlice';
import WaterUnitSelector from '../components/WaterUnitSelector';
import { lbsToKg, ozToKg, flOzToML } from '../globalFunctons';

//TODO change water capacity to appear for any category with holdWater: true


export default function NewItemScreen( { navigation }) {

  const [icon, setIcon] = useState('food-drumstick');
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState('food');
  const [weight, setWeight] = useState();
  const [liquidCapacity, setliquidCapacity] = useState();
  //unit for input weight. Should be lbs, oz, or kg
  const [weightUnits, setWeightUnits] = useState('lbs');
  const [liquidCapacityUnits, setliquidCapacityUnits]= useState('fl oz');
  const categories = useSelector(state => state.categories.value);
  
  const dispatch = useDispatch();
  
  function addNewItem(){
    const numWeight = Number(weight);
    const numliquidCapacity = Number(liquidCapacity);

     if(!name || !weight){
      Alert.alert("Name and Weight are required");
    }else if(!isFinite(numWeight) || numWeight < 0){
      Alert.alert("Weight must be a valid positive number");
    }else if(categories[category].holdsLiquid && (!isFinite(numliquidCapacity) || numliquidCapacity < 0)){
      Alert.alert("Water capacity must be a valid positive number");
    }else{
      let kgWeight;
  
      switch(weightUnits){
          case('kg'): kgWeight = weight; break;
          case('lbs'): kgWeight = lbsToKg(weight); break;
          case('oz'): kgWeight = ozToKg(weight); break;
        };
  
      const adjustedCapacity = liquidCapacityUnits === 'mL' ? numliquidCapacity : flOzToML(numliquidCapacity);

      console.log(adjustedCapacity)
  
      let newItem = {
        category: category,
        brand: brand,
        name: name,
        weight: kgWeight,
        qty: 1,
        inPack: false
      }
  
      if(categories[category].holdsLiquid){
        newItem.liquidCapacity = adjustedCapacity;
      }
  
      dispatch(addItem(newItem));
      navigation.navigate('Locker');
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => Keyboard.dismiss()} activeOpacity={1}>
      <View style={styles.iconHeader}>
        <CategoryPicker state={category} setState={setCategory} setIcon={setIcon}/>
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
            onChangeText={value => setWeight(value)}
            value={weight}
            keyboardType='numeric'
            placeholder={weightUnits}
          />
        </View>
        <WeightUnitSelector state={weightUnits} setState={setWeightUnits}/>
      </View>

      {categories[category].holdsLiquid ? 
      <View>
        <View style={styles.row}>
          <View style={styles.formItem}>
            <Text style={styles.labelText}>Liquid Capacity</Text>
            <TextInput 
              style={styles.numberInput}
              keyboardType='numeric'
              value={liquidCapacity}
              placeholder={liquidCapacityUnits}
              onChangeText={value => setliquidCapacity(value)}
            />
          </View>
          <WaterUnitSelector state={liquidCapacityUnits} setState={setliquidCapacityUnits}/>
        </View>
        <Text style={{color: colors.white}}>*For categories that contain liquid, set weight to the empty container weight. Weight of the liquid will be calculated automatically by the liquid capacity value.</Text>
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
