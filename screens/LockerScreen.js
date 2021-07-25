import React from 'react'
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native'
import NewPackItem from '../components/NewPackItem';
import PackItem from '../components/PackItem';
import { colors } from '../styles/globalStyles'
import InventoryItem from '../components/InventoryItem';
import { useSelector, useDispatch } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';



//screen that contains a horizonal scroll view at the top for packs, and a list of inventory items below. Also has an "Add Item" button to bring up a new item screen in the stack.

export function LockerScreen({ navigation }) {

  // function uses an object with id 0 to start list with a CreateNewPack component, then renders all other existing packs
  const renderPack = ({ item }) => (
    item.id != 0 ? <PackItem pack={item} /> : <NewPackItem pressHandler={() => navigation.navigate('New Pack')}/>
  );
  
  const renderInventory = ({ item }) => (<InventoryItem item={item} />)

  //redux packs and inventory state
  const packs = useSelector((state) => state.packs.value)
  const inventory = useSelector((state) => state.inventory.value)

  return (
    <View style={styles.container}>
      <Text style={styles.categoryHeader}>Packs</Text>
      <View style={styles.packsWindow}>
        <FlatList 
          data={packs}
          renderItem={renderPack}
          keyExtractor= {item => item.id}
          horizontal={true}
          />
      </View>
      <View style={styles.inventoryHeader}>
        <TouchableOpacity>
          <Text>Sort By</Text>
        </TouchableOpacity>
        <Text style={styles.categoryHeader}>Inventory</Text>
        <TouchableOpacity onPress={() => navigation.navigate('New Item')}>
          <AntDesign 
          name={'pluscircleo'} 
          size={24} 
          color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.inventoryList}>
        <FlatList 
          data={inventory}
          renderItem={renderInventory}
          keyExtractor= {item => item.id}
          />
      </View>
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
    height: 120,
    padding: 5
  },
  inventoryHeader: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  },
  inventoryList: {
    flex: 1,
    padding: 3
  }
});
