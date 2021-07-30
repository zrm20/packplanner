import React from 'react'
import {Picker} from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { colors } from '../styles/globalStyles'


export default function CategoryPicker({ state, setState }) {
  
  const categories = useSelector((state) => state.categories.value);

  return (
    <Picker
      selectedValue={state}
      onValueChange={(itemValue, itemIndex) => setState(itemValue)}
      style={{width: 280}}
      >
      {categories.map((category) => (<Picker.Item color={colors.white} label={category.label} value={category.value}/>))}
    </Picker>

  )
};

