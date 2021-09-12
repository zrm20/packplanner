import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import { colors } from '../styles/globalStyles';
import InventoryItem from '../components/InventoryItem';
import GenericButton from '../components/GenericButton'

export default function ViewCategoryItems({ navigation, route}) {
  //obtain category key, then collect the category object from redux slice
  const categoryKey = route.params;
  const categories = useSelector(state => state.categories.value);
  const category = categories[categoryKey];

  //create an array of inventory objects that fall under this category
  const inventory = useSelector(state => state.inventory.value);
  let itemsInCategory = [];
  for(let i = 0; i < inventory.length; i++){
    if(inventory[i].category === categoryKey){
      itemsInCategory.push(inventory[i]);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.label}</Text>
      <ScrollView style={styles.scrollView}>
        {
          itemsInCategory.length > 0 ?
          itemsInCategory.map(item => (
            <InventoryItem item={item} longPressHandler={() => navigation.navigate("Edit Item", item)}/>
            )) :
            <Text style={styles.warningText}>No items in this category</Text>
          }
      </ScrollView>
      <View style={styles.buttonBar}>
        <GenericButton 
          name='Add New Item' 
          size={14} 
          pressHandler={() => navigation.navigate('New Item', categoryKey)}/>
          {
            !category.stock ? 
            <GenericButton 
              name='Edit Category'
              size={14}
              pressHandler={() => navigation.navigate('Edit Category', category)}
              /> :
            null
          }
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color3,
    padding: 5
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.white,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.color5,
    margin: 5,
    borderRadius: 8,
    padding: 5
  },
  warningText: {
    color: colors.color4,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 15
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});
