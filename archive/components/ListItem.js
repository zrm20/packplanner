import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setAllPacksInactive, toggleActivePack, restorePack } from '../redux/PacksSlice';
import { colors } from '../styles/globalStyles';
import { emptyPack, restoreItem, toggleInPack, updateQty } from '../redux/InventorySlice';
import { deleteList } from '../redux/ListsSlice';

export default function ListItem({ list, goBack }) {
  const dispatch = useDispatch();
  const packs = useSelector(state => state.packs.value);
  const inventory = useSelector(state => state.inventory.value);

  const dateCreated = new Date(list.dateCreated);
  const name = list.name ? list.name : "-no name found-";

  function importPackFromList(){
    //Sets all packs isActivePack to false. 
    dispatch(setAllPacksInactive());
    
    //If the list object contains a pack, checks to see if pack still exists in packsSlice.
    const packIndex = packs.findIndex(pack => pack.id === list.pack.id);

    if(packIndex >= 0){
      //pack exists, therefore set it to active
      dispatch(toggleActivePack(list.pack.id));
    }else if(packIndex === -1){
      //pack does not exist. Promt user if they want to add the pack back in
      Alert.alert('Pack no longer exists', 'Would you like to restore this pack to your locker?', [
        {
          text: 'Restore Pack',
          //user opts to reAdd the pack from the list
          onPress: () => dispatch(restorePack(list.pack))
        },
        {
          text: 'Skip Pack'
        }
      ])
    }
  }

  function importItemsFromList(){
    //First set all items to inPack false;
    dispatch(emptyPack());

    //Check each item in list to see if is still exists
    let itemsThatDoNotExist =[];

    list.items.forEach(item => {
      if(inventory.findIndex(element => element.id === item.id) >= 0){
        //list item does exist in inventory
        dispatch(toggleInPack(item.id));
        dispatch(updateQty({id: item.id, newQty: item.qty}));
      }else{
        //list item does NOT exist anymore
        itemsThatDoNotExist.push(item);
      }
    });

    //if there are items that no longer exist, prompt user
    if(itemsThatDoNotExist.length > 0){
      Alert.alert('Restore items that do not exist?', `There are ${itemsThatDoNotExist.length} item(s) that no longer exist in your inventory. Would you like to restore them?`,[
        {
          text: `Restore ${itemsThatDoNotExist.length} items`,
          onPress: () => {
            itemsThatDoNotExist.forEach(item =>
              dispatch(restoreItem(item)))
          }
        },
        {
          text: `Skip ${itemsThatDoNotExist.length} items`
        }
      ])
    }
  }

  const importOptions = [
    {
      text: 'Import',
      onPress: () => {
        if(list.pack){
          importPackFromList();
        }
        importItemsFromList();
        goBack();
      }
    },
    {
      text: 'Cancel'
    }
  ]

  function verifyImport(){
    Alert.alert('Import list to pack?', `This will clear your current pack and restore pack from ${name}`, importOptions)
  }

  function verifyDelete(){
    Alert.alert('Delete List?', `Would you like to perminantly delete ${name}?`,[
      {
        text: 'Delete',
        onPress: () => dispatch(deleteList(list.id))
      },
      {
        text: 'Cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.dateText}>Date Created: {dateCreated.toLocaleDateString()}</Text>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={verifyDelete}>
        <MaterialCommunityIcons name="delete" size={40} color={colors.red} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={verifyImport}>
        <MaterialCommunityIcons name="import" size={40} color={colors.color1} />
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 55,
    marginVertical: 3,
    padding: 5,
    borderBottomWidth: 2,
    borderColor: colors.color1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dateText: {
    color: colors.color4,
    fontSize: 14
  },
  nameText: {
    color: colors.color4,
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    marginHorizontal: 5
  }
});
