import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../styles/globalStyles';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { toggleInPack } from '../redux/InventorySclice';

export default function InventoryItem({ item }) {

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.basicInfo}>
          <Text style={styles.categoryText}>{item.category}</Text>
          <Text style={styles.brandText}>{item.brand}</Text>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <View style={styles.attributeInfo}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="weight-pound" size={24} color={colors.white} />
            <Text style={styles.attributeText}>{item.weight}</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons name="water" size={24} color={colors.white} />
            <Text style={styles.attributeText}>{item.waterCapacity ? item.waterCapacity + "L" : null}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.buttonBox}
        onPress={() => dispatch(toggleInPack(item.id))}
        >
        <AntDesign 
          name={!item.inPack ? 'pluscircleo' : 'minuscircleo'} 
          size={50} 
          color={item.inPack ? 'red' : colors.white} />
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 100,
    borderColor: colors.color1,
    borderWidth: 3,
    borderRadius: 12,
    padding: 5,
    flexDirection: 'row',
    marginVertical: 3
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoBox: {
    flex: 1,
    flexDirection: 'row'
  },
  basicInfo: {
    width: '50%',
  },
  attributeInfo: {
    width: '50%',
  },
  attributeText: {
    color: colors.white,
    fontSize: 18,
    margin: 3
  },
  buttonBox: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryText: {
    fontSize: 14,
    color: colors.white
  },
  brandText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.color2
  },
  nameText: {
    fontSize: 18,
    color: colors.color5
  },
});
