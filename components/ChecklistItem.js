import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/globalStyles';
import { useDispatch } from 'react-redux';
import { togglePackedStatus } from '../redux/InventorySlice';

export default function ChecklistItem({ item }) {

  const dispatch = useDispatch();

  const itemString = `(${item.qty}) ${item.brand ? item.brand + ' ' : null}${item.name}`
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => dispatch(togglePackedStatus(item.id))}
        >
        {
          item.isPacked ? 
          <MaterialIcons name="check-circle-outline" size={40} color={colors.green} /> :
          <MaterialIcons name="radio-button-unchecked" size={40} color={colors.color1} />
        }
      </TouchableOpacity>
      <Text style={styles.text(itemString.length)}>{itemString}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,

  },
  text: (textLength) => ({
    fontSize: 24,
    marginLeft: 5
  })
});
