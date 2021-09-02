import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/globalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function CategoryItem({ category, editHandler }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        {!category.icon ? null : 
        <MaterialCommunityIcons name={category.icon} size={60} color={colors.color4}/>}
      </View>
      <View style={styles.centerInfo}>
        <Text style={styles.titleText}>{category.label}</Text>
        <View style={styles.attributes}>
          <Text>Included in Base Weight: {category.baseWeightExempt ? 'NO' : 'YES'}</Text>
        </View> 
      </View>
      {
        category.stock ? null :
        <TouchableOpacity onPress={() => editHandler(category)}>
          <MaterialCommunityIcons name="square-edit-outline" size={45} color={colors.color4} />
        </TouchableOpacity>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '98%',
    height: 75,
    backgroundColor: colors.color5,
    margin: 3,
    padding: 3,
    flexDirection: 'row',
    borderColor: colors.color4,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconView: {
    width: '20%',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  centerInfo: {
    flex: 1
  },
  attributes: {
    flexDirection: 'row'
  }
});
