import React, { useState } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, StyleSheet, Alert, Keyboard, TouchableOpacity } from 'react-native'
import { colors } from '../styles/globalStyles'
import { useDispatch } from 'react-redux';
import { replacePack, removePack } from '../redux/PacksSlice'
import WeightUnitSelector from '../components/WeightUnitSelector';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { lbsToKg, ozToKg } from '../globalFunctons';
import GenericButton from '../components/GenericButton';


export default function EditPackScreen( { navigation, route }) {

  const packToEdit =  route.params;

  const [brand, setBrand] = useState(packToEdit.brand);
  const [model, setModel] = useState(packToEdit.model);
  const [capacity, setCapacity] = useState(packToEdit.capacity);
  const [weight, setWeight] = useState(packToEdit.weight);
  //unit for input weight. Should be lbs, oz, or kg
  const [weightUnits, setWeightUnits] = useState('kg');
  
  const dispatch = useDispatch();
  
  function submitPack(){
    if(!brand || !model || !weight){
      Alert.alert("Brand, Model and Weight are required");
    }else if(!isFinite(weight) || weight < 0){
      Alert.alert("Weight must be positive number");
    }else{
      let kgWeight;
  
      switch(weightUnits){
        case('kg'): kgWeight = weight; break;
        case('lbs'): kgWeight = lbsToKg(weight); break;
        case('oz'): kgWeight = ozToKg(weight); break;
      };
  
      const newPack = {
        id: packToEdit.id,
        brand: brand,
        model: model,
        weight: kgWeight,
        capacity: capacity
      };
      
      dispatch(replacePack(newPack));
  
      navigation.navigate('Locker');
    }
  }

  function deletePack(){
    dispatch(removePack(packToEdit.id))
    navigation.navigate("Locker")
  }

  function confirmDelete(){
    const buttonOptions = [
      {
        text: 'Delete',
        onPress: deletePack
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancelled!')
      }
    ]
    Alert.alert('Are you sure?', 'Do you want to perminantly delete this pack?', buttonOptions);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => Keyboard.dismiss()} activeOpacity={1}>
      <View style={styles.formItem}>
        <View style={styles.iconHeader}>
          <MaterialCommunityIcons name="bag-personal" size={100} color={colors.color5} />
        </View>
        <Text style={styles.labelText}>Brand</Text>
        <TextInput 
          style={styles.textInput} 
          value={brand}
          onChangeText={(value) => setBrand(value)}
          placeholder='Backpack Brand'
          maxLength={25}
          />
      </View>
      <View style={styles.formItem}>
        <Text style={styles.labelText}>Model</Text>
        <TextInput 
          style={styles.textInput} 
          value={model}
          onChangeText={(value) => setModel(value)}
          placeholder='Backpack Model'
          maxLength={35}
          />
      </View>
      <View style={styles.row}>
        <View style={styles.formItem}>
          <Text style={styles.labelText}>Weight</Text>
          <TextInput 
            style={styles.numberInput} 
            value={weight.toString()}
            onChangeText={(value) => setWeight(Number(value))}
            keyboardType='numeric'
            placeholder={weightUnits}
            />
        </View>
        <WeightUnitSelector state={weightUnits} setState={setWeightUnits}/>
      </View>
      <View style={styles.formItem}>
        <Text style={styles.labelText}>Capacity (L)</Text>
        <TextInput 
          style={styles.numberInput} 
          value={capacity ? capacity.toString() : null}
          onChangeText={(value) => setCapacity(value)}
          keyboardType='numeric'
          placeholder='Liters'
          />
      </View>
      <View style={styles.iconHeader}>
        <GenericButton name='Submit' pressHandler={submitPack}/>
        <GenericButton name='Delete' pressHandler={confirmDelete}/>
        <GenericButton name='Cancel' pressHandler={() => navigation.navigate('Locker')}/>
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
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
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
