import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Vibration, TextInput, Keyboard } from 'react-native'
import NewPackItem from '../components/NewPackItem';
import PackItem from '../components/PackItem';
import { colors } from '../styles/globalStyles'
import InventoryItem from '../components/InventoryItem';
import { useSelector, useDispatch } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { resetToInitialState } from '../redux/InventorySlice';

//TODO clear search field on load
//TODO Add icon for empty locker

//screen that contains a horizonal scroll view at the top for packs, and a list of inventory items below. Also has an "Add Item" button to bring up a new item screen in the stack.

export function LockerScreen({ navigation }) {

  const [searchBox, setSearchBox] = useState('');

  //function for long pressing the PackItem, to then navigate to the edit page
  function editPack(pack){
    Vibration.vibrate(50);
    navigation.navigate("Edit Pack", pack);
  }

  // function uses an object with id 0 to start list with a CreateNewPack component, then renders all other existing packs
  const renderPack = ({ item }) => (
    item.id != 0 ? <PackItem pack={item} longPressHandler={editPack}/> : <NewPackItem pressHandler={() => navigation.navigate('New Pack')}/>
  );
  
  const renderInventory = ({ item }) => (<InventoryItem item={item} longPressHandler={() => navigation.navigate('Edit Item', item)}/>)

  //redux packs and inventory state
  const packs = useSelector((state) => state.packs.value)
  const inventory = useSelector((state) => state.inventory.value)

  function filterInventory(item){
    //function for filtering inventory items by searchBox
    const lowerBrand = item.brand.toLowerCase();
    const lowerName = item.name.toLowerCase();
    const lowerCategory = item.category.toLowerCase();
    
    return (lowerBrand.includes(searchBox) || lowerName.includes(searchBox) || lowerCategory.includes(searchBox));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.categoryHeader}>Packs</Text>
      <View style={styles.packsWindow}>
        <FlatList 
          data={packs}
          renderItem={renderPack}
          keyExtractor= {item => item.id.toString()}
          horizontal={true}
          />
      </View>
      <View style={styles.inventoryHeader}>
        <TextInput 
          style={styles.searchBox} 
          placeholder="Search Inventory"
          onChangeText={value => setSearchBox(value.toLowerCase())}
          clearButtonMode='always'
          />
        <Text style={styles.inventoryHeaderText}>Inventory</Text>
        <View style={styles.inventoryButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('New Item')}>
            <AntDesign 
            name={'pluscircleo'} 
            size={24} 
            color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inventoryList}>
        <FlatList 
          data={inventory.filter(filterInventory)}
          renderItem={renderInventory}
          keyExtractor= {item => item.id.toString()}
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
    justifyContent: 'space-evenly'
  },
  inventoryHeaderText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    margin: 3,
    padding: 2,
    width: '33%',
    textAlign: 'center'
  },
  inventoryWindow: {
    width: '95%',
  },
  inventoryButtons: {
    width: '33%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8
  },
  categoryHeader: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    margin: 3,
    padding: 2,
    textAlign: 'center'
  },
  inventoryList: {
    flex: 1,
    padding: 3
  },
  searchBox: {
    width: '33%',
    height: 24,
    borderColor: colors.color5,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: colors.color5
  }
});
