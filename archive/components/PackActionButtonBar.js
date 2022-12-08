import React from 'react'
import { View, TouchableOpacity, StyleSheet, Alert, Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { colors } from '../styles/globalStyles';
import { useDispatch } from 'react-redux';
import { emptyPack } from '../redux/InventorySlice';

export default function PackActionButtonBar({ chartsPress, checklistPress, exportPress, importPress }) {

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
      <TouchableOpacity style={styles.button} onPress={chartsPress}>
        <Text style={styles.labelText}>Charts</Text>
        <AntDesign name="piechart" size={34} color={colors.color5} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={checklistPress}>
        <Text style={styles.labelText}>Checklist</Text>
        <Octicons name="checklist" size={34} color={colors.color5} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={exportPress}>
        <Text style={styles.labelText}>Save List</Text>
        <AntDesign name="save" size={34} color={colors.color5} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={importPress}>
        <Text style={styles.labelText}>Import</Text>
        <MaterialCommunityIcons name="import" size={34} color={colors.color5} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={confirmDelete}>
        <Text style={styles.labelText}>Empty</Text>
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
    alignItems: 'center'
  },
  button: {
    height: 60,
    width: 60,
    padding: 3,
    marginHorizontal: 15,
    borderColor: colors.color1,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center'
  },
  labelText: {
     color: colors.color5,
     fontSize: 8,
     textAlign: 'center',
     marginBottom: 2
  }
});