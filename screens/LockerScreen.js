import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { colors } from '../styles/globalStyles'


//screen that contains a horizonal scroll view at the top for packs, and a list of inventory items below. Also has an "Add Item" button to bring up a new item screen in the stack.

//testing only
const data = [
  {
    id: 1,
    brand: 'Osprey',
    model: 'Lumina 45',
    capacity: 45
  },
  {
    id: 2,
    brand: 'Osprey',
    model: 'Exo 60',
    capacity: 62
  },
  {
    id: 3,
    brand: 'Teton',
    model: 'Mountaneer 60',
    capacity: 65
  },
  {
    id: 4,
    brand: 'Teton',
    model: 'Mountaneer 60',
    capacity: 65
  },
  {
    id: 5,
    brand: 'Teton',
    model: 'Mountaneer 60',
    capacity: 65
  },
  {
    id: 6,
    brand: 'Teton',
    model: 'Mountaneer 60',
    capacity: 65
  },
  {
    id: 7,
    brand: 'Teton',
    model: 'Mountaneer 60',
    capacity: 65
  },
  {
    id: 8,
    brand: 'Teton',
    model: 'Mountaneer 60',
    capacity: 65
  },
];

function PackComponent( { brand, model }){
  return(
    <View style={{height: 60, width: 60, backgroundColor: 'red', margin: 3}}>
      <Text>{brand}</Text>
      <Text>{model}</Text>
    </View>
  )
}
//end testing


const renderPack = ({ item }) => (
    <PackComponent brand={item.brand} model={item.model}/>
)

export function LockerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryHeader}>Packs</Text>
      <View style={styles.packsWindow}>
        <FlatList 
          data={data}
          renderItem={renderPack}
          keyExtractor= {item => item.id}
          horizontal={true}
          />
      </View>
      <Text style={styles.categoryHeader}>Inventory</Text>
      <FlatList style={styles.inventoryWindow}>
        <Text>Hello</Text>
      </FlatList>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.color3
  },
  packsWindow: {
    width: '95%',
    height: 100,
    padding: 5
  },
  inventoryWindow: {
    width: '95%',
  },
  categoryHeader: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    margin: 3,
    padding: 2
  }
});
