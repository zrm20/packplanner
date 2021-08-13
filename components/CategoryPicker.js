import React from 'react'
import {Picker} from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { colors } from '../styles/globalStyles'


export default function CategoryPicker({ state, setState, setIcon }) {
  
  const categories = useSelector((state) => state.categories.value);
  
  let categoryValues= [];

  for(const[key, value] of Object.entries(categories)){
    categoryValues.push(key);
  }

  function changeHandler(itemValue, itemIndex){
    setState(itemValue);
    if(categories[itemValue].icon){
      setIcon(categories[itemValue].icon);
    }else{
      setIcon('crosshairs-question')
    }
  }

  return (
    <Picker
      selectedValue={state}
      onValueChange={changeHandler}
      style={{width: 280}}
      >
      {categoryValues.map((category) => (<Picker.Item key={category} color={colors.white} label={categories[category].label} value={category}/>))}
    </Picker>

  )
};

