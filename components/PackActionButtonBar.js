import React from 'react'
import { View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { colors } from '../styles/globalStyles';
import { useDispatch } from 'react-redux';
import { emptyPack } from '../redux/InventorySlice';

export default function PackActionButtonBar() {

  const dispatch = useDispatch();

  function confirmDelete(){
    const buttonOptions = [
      {
        text: 'Empty Pack',
        onPress: () => dispatch(emptyPack())
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancelled!')
      }
    ]
    Alert.alert('Empty pack?', 'All items will be removed from your pack', buttonOptions);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <AntDesign name="piechart" size={34} color={colors.color5} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Octicons name="checklist" size={34} color={colors.color5} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <AntDesign name="printer" size={34} color={colors.color5} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <AntDesign name="save" size={34} color={colors.color5} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={confirmDelete}>
        <AntDesign name="delete" size={34} color={colors.color5} />
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
    borderBottomColor: colors.color5,
    borderBottomWidth: 3,
  },
  button: {
    padding: 5,
    marginHorizontal: 15,
    borderColor: colors.color1,
    borderWidth: 2,
    borderRadius: 5
  }
});