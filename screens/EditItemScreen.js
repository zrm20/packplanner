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
  const [weight, setWeight] = useState(itemToEdit.weight.toString());
  const [liquidCapacity, setliquidCapacity] = useState(itemToEdit.liquidCapacity ? itemToEdit.liquidCapacity.toString() : null);

  //unit for input weight. Should be lbs, oz, or kg
  const [weightUnits, setWeightUnits] = useState('kg');
  const [liquidCapacityUnits, setliquidCapacityUnits]= useState('mL');
  
  const dispatch = useDispatch();
  
  function submitItem(){
     if(!name || !weight){
      Alert.alert("Name and Weight are required");
    }else if(!isFinite(weight) || weight < 0){
      Alert.alert("Weight must be positive number");
    }else if(categories[category].holdsLiquid && (!isFinite(liquidCapacity) || liquidCapacity < 0)){
      Alert.alert("Liquid capacity must be positive number");
    }else{
      //everything is good, so submit item
      let kgWeight;
  
      switch(weightUnits){
          case('kg'): kgWeight = Number(weight); break;
          case('lbs'): kgWeight = lbsToKg(Number(weight)); break;
          case('oz'): kgWeight = ozToKg(Number(weight)); break;
        };
  
      const adjustedCapacity = liquidCapacityUnits === 'mL' ? Number(liquidCapacity) : flOzToML(Number(liquidCapacity));
  
      let newItem = {
        id: itemToEdit.id,
        category: category,
        brand: brand,
        name: name,
        weight: kgWeight,
        inPack: itemToEdit.inPack,
        qty: itemToEdit.qty,
        isPacked: itemToEdit.isPacked
      };
  
      if(categories[category].holdsLiquid){
        newItem.liquidCapacity=adjustedCapacity;
      }
      
      dispatch(replaceItem(newItem));
      navigation.goBack();
    }
  }

  function deleteItem(){
    dispatch(removeItem(itemToEdit.id));
    navigation.goBack();
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
            onChangeText={value => setWeight(value)}
            value={weight}
            keyboardType='numeric'
            placeholder={weightUnits}
          />
        </View>
        <WeightUnitSelector state={weightUnits} setState={setWeightUnits}/>
      </View>

      {categories[category].holdsLiquid ? 
      <View style={styles.row}>
        <View style={styles.formItem}>
          <Text style={styles.labelText}>Liquid Capactiy</Text>
          <TextInput 
            style={styles.numberInput}
            keyboardType='numeric'
            placeholder={liquidCapacityUnits}
            value={liquidCapacity}
            onChangeText={setliquidCapacity}
          />
        </View>
        <WaterUnitSelector state={liquidCapacityUnits} setState={setliquidCapacityUnits}/>
      </View>
      : null
      }

      <View style={styles.row}>
        <GenericButton  size={20} name='Submit' pressHandler={submitItem}/>
        <GenericButton  size={20} name='Cancel' pressHandler={() => navigation.goBack()}/>
        <GenericButton  size={20} name='Delete' pressHandler={confirmDelete}/>
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
    fontSize: 18,
    
  },
  textInput: {
    width: '90%',
    height: 30,
    backgroundColor: colors.white
  },
  numberInput: {
    width: 100,
    height: 30,
    backgroundColor: colors.white
  },
  formItem: {
    marginVertical: 5,
    marginHorizontal: 10
  }
});
