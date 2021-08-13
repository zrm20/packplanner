import React, { useState } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, StyleSheet, Alert, Keyboard, TouchableOpacity } from 'react-native'
import { colors } from '../styles/globalStyles'
import { useDispatch } from 'react-redux';
import { addPack } from '../redux/PacksSlice'
import WeightUnitSelector from '../components/WeightUnitSelector';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddButton from '../components/AddButton'
import { lbsToKg, ozToKg } from '../globalFunctons';


//TODO add hide keyboard function

export default function NewPackScreen( { navigation }) {

  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [capacity, setCapacity] = useState();
  const [weight, setWeight] = useState();
  //unit for input weight. Should be lbs, oz, or kg
  const [weightUnits, setWeightUnits] = useState('lbs');
  
  const dispatch = useDispatch();
  
  function addNewPack(){
    
    const numWeight = Number(weight);
    const numCapacity = Number(capacity);

    if(!brand || !model || !weight){
      Alert.alert("Brand, Model and Weight are required");
    }else if(!isFinite(numWeight) || numWeight < 0){
      Alert.alert("Weight must be positive number");
    }else if(capacity && isNaN(numCapacity)){
      Alert.alert("Capacity must be valid number");
    }else{
      let kgWeight;
  
      switch(weightUnits){
        case('kg'): kgWeight = numWeight; break;
        case('lbs'): kgWeight = lbsToKg(numWeight); break;
        case('oz'): kgWeight = ozToKg(numWeight); break;
      };
  
      const newPack = {
        brand: brand,
        model: model,
        weight: kgWeight,
        capacity: isNaN(numCapacity) ? 0 : numCapacity
      };
  
      dispatch(addPack(newPack));
  
      setBrand(null);
      setModel(null);
      setCapacity(null);
      setWeight(null);
  
      navigation.navigate('Locker');
    }  
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
            value={weight}
            onChangeText={(value) => setWeight(value)}
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
          value={capacity}
          onChangeText={(value) => setCapacity(value)}
          keyboardType='numeric'
          placeholder='Liters'
          />
      </View>
      <View style={styles.iconHeader}>
        <AddButton name='Pack' pressHandler={addNewPack}/>
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
