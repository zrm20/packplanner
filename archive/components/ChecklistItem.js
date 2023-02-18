import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/globalStyles';
import { useDispatch } from 'react-redux';
import { togglePackedStatus } from '../redux/InventorySlice';

export default function ChecklistItem({ item }) {

  const dispatch = useDispatch();

  const itemString = `(${item.qty}) ${item.brand ? item.brand + ' ' : ''}${item.name}`
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => dispatch(togglePackedStatus(item.id))}
        >
        {
          item.isPacked ? 
          <MaterialIcons name="check-circle-outline" size={35} color={colors.green} /> :
          <MaterialIcons name="radio-button-unchecked" size={35} color={colors.color1} />
        }
      </TouchableOpacity>
      <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>{itemString}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,

  },
  text: {
    fontSize: 22,
    marginLeft: 5
  }
});
