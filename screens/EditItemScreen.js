import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, Keyboard, TouchableOpacity } from 'react-native'
import { colors } from '../styles/globalStyles'
import { useSelector, useDispatch } from 'react-redux';
import WeightUnitSelector from '../components/WeightUnitSelector';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GenericButton from '../components/GenericButton'
import CategoryPicker from '../components/CategoryPicker';
import { replaceItem, removeItem } from '../redux/InventorySlice';
import WaterUnitSelector from '../components/WaterUnitSelector';
import { lbsToKg, ozToKg, flOzToML } from '../globalFunctons';

export default function EditItemScreen( { navigation, route }) {

  const itemToEdit = route.params;
  const categories = useSelector(state => state.categories.value)

  const [icon, setIcon] = useState(categories[itemToEdit.category].icon);
  const [brand, setBrand] = useState(itemToEdit.brand);
  const [name, setName] = useState(itemToEdit.name);
  const [category, setCategory] = useState(itemToEdit.category);
  const [weight, setWeight] = useState(itemToEdit.weight);
  const [waterCapacity, setWaterCapacity] = useState(itemToEdit.waterCapacity ? itemToEdit.waterCapacity : null);
  //unit for input weight. Should be lbs, oz, or kg
  const [weightUnits, setWeightUnits] = useState('kg');
  const [waterCapacityUnits, setWaterCapacityUnits]= useState('mL');
  
  const dispatch = useDispatch();
  
  function submitItem(){
     if(!name || !weight){
      Alert.alert("Name and Weight are required");
    }else if(!isFinite(weight) || weight < 0){
      Alert.alert("Weight must be positive number");
    }else if(category === 'water' && (!isFinite(waterCapacity) || waterCapacity < 0)){
      Alert.alert("Water capacity must be positive number");
    }else{
      let kgWeight;
  
      switch(weightUnits){
          case('kg'): kgWeight = weight; break;
          case('lbs'): kgWeight = lbsToKg(weight); break;
          case('oz'): kgWeight = ozToKg(weight); break;
        };
  
      const adjustedCapacity = waterCapacityUnits === 'mL' ? waterCapacity : flOzToML(waterCapacity);
  
      let newItem = {
        id: itemToEdit.id,
        category: category,
        brand: brand,
        name: name,
        weight: kgWeight,
        inPack: itemToEdit.inPack
      }
  
      if(category === 'water'){
        newItem.waterCapacity=adjustedCapacity
      }
  
      dispatch(replaceItem(newItem));
      navigation.navigate('Locker');
    }
  }

  function deleteItem(){
    dispatch(removeItem(itemToEdit.id))
    navigation.navigate("Locker")
  }

  function confirmDelete(){
    const buttonOptions = [
      {
        text: 'Delete',
        onPress: deleteItem
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancelled!')
      }
    ]
    Alert.alert('Are you sure?', 'Do you want to perminantly delete this item?', buttonOptions);
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
            onChangeText={value => setWeight(Number(value))}
            value={weight.toString()}
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
            value={waterCapacity.toString()}
            onChangeText={value => setWaterCapacity(Number(value))}
          />
        </View>
        <WaterUnitSelector state={waterCapacityUnits} setState={setWaterCapacityUnits}/>
      </View>
      : null
      }

      <View style={styles.row}>
        <GenericButton name='Submit' pressHandler={submitItem}/>
        <GenericButton name='Cancel' pressHandler={() => navigation.navigate('Locker')}/>
        <GenericButton name='Delete' pressHandler={confirmDelete}/>
      </View>

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
