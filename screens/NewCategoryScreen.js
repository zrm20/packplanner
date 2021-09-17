import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import IconPicker from "react-native-icon-picker";
import GenericButton from '../components/GenericButton';
import BasicSwitch from '../components/BasicSwitch'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/globalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../redux/CategoriesSlice';
import { iconsList } from '../assets/iconsList'

const iconDetails = iconsList;


export default function NewCategoryScreen({ navigation }) {

  const categories = useSelector(state => state.categories.value);
  const dispatch = useDispatch();
  
  const [categoryName, setCategoryName] = useState('');
  const [baseWeightExempt, setBaseWeightExempt] = useState(false);
  const [holdsLiquid, setholdsLiquid] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [icon, setIcon] = useState('account');

  function selectIcon(icon){
    setIcon(icon.icon);
    setShowIconPicker(false);
  }

  //function to convert to camel case via Stack Overflow
  function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  //function that checks if the name is in use already. Returns true if name is valid
  function validateName(keyName){
    if(!categoryName){
      Alert.alert("Must include a category name")
      return false;
    }else if(categories[keyName]){
      Alert.alert("That category name already exists")
      return false;
    }
    else{
      return true
    }
  }

  function submitCategory(){
    const keyName = camelize(categoryName);

    const newCategory = {
      label: categoryName,
      baseWeightExempt: baseWeightExempt,
      holdsLiquid: holdsLiquid,
      icon: icon
    }

    const payload = {
      key: keyName,
      newCategory: newCategory
    }

    if(validateName(keyName)){
      dispatch(addCategory(payload))
      navigation.navigate('Edit Categories')
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => Keyboard.dismiss()} activeOpacity={1}>
      <View style={styles.form}>
        <Text style={styles.textInputLabel}>Category Name</Text>
        <TextInput 
          style={styles.textInput}
          value={categoryName}
          onChangeText={setCategoryName}/>
        <BasicSwitch 
          name="Exempt from base weight?"
          value={baseWeightExempt}
          setValue={setBaseWeightExempt}
          />
        <Text style={styles.alertText}>{baseWeightExempt ? 'Items will NOT count towards base weight' : 'Items WILL count towards base weight'}</Text>
        <Text style={styles.noteText}>*Typically items that are consumable, such as food or fuel, are not counted towards base weight</Text>
        <BasicSwitch 
          name="Holds Liquid?"
          value={holdsLiquid}
          setValue={setholdsLiquid}
          />
       
        <Text style={styles.alertText}>{holdsLiquid ? 'Items WILL hold liquid' : 'Items will NOT hold liquid'}</Text>

        <View style={styles.iconSection}>
          <IconPicker 
            showIconPicker={showIconPicker}
            toggleIconPicker={() => setShowIconPicker(!showIconPicker)}
            iconDetails={iconDetails}
            onSelect={selectIcon}
            content={<GenericButton name='Select Icon' pressHandler={() => setShowIconPicker(!showIconPicker)}/>}
            />

          <MaterialCommunityIcons name={icon} size={100} color={colors.color4}/>
        </View>
      </View>
      <GenericButton name='Add Category' size={30} pressHandler={submitCategory} />
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color3,
    padding: 5,
    alignItems: 'center'
  },
  form: {
    width: '100%',
    padding: 10
  },
  textInputLabel: {
    color: colors.white,
    fontSize: 20,
    marginTop: 8
  },
  textInput: {
    height: 40,
    width: '100%',
    backgroundColor: colors.color5,
    borderRadius: 5,
    marginVertical: 5
  },
  alertText: {
    color: colors.color1,
    fontSize: 20,
    margin: 3,
    textAlign: 'center'
  },
  iconSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noteText: {
    color: colors.white,
    fontSize: 14,
    marginVertical: 5,
    textAlign: 'center'
  }
});
