import React, { useState } from 'react'
import { TextInput, View, Text, StyleSheet, Alert } from 'react-native';
import { colors } from '../styles/globalStyles';
import GenericButton from '../components/GenericButton';
import { saveList } from '../redux/ListsSlice'
import { useDispatch } from 'react-redux';

export default function NewListScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [listName, setListName] = useState('');
  const {pack, items} = route.params;

  function exportAsList(){
    const newList = {
      name: listName,
      pack: pack,
      items: items,
      dateCreated: new Date(Date.now())
    }

    if(listName.length < 3){
      Alert.alert("List name must be between 3 and 25 characters")
    }else{
      dispatch(saveList(newList));
      navigation.goBack();
    };

  }


  return (
    <View style={styles.container}>
      <Text style={styles.label}>New List Name:</Text>
      <TextInput 
        style={styles.textInput}
        value={listName}
        onChangeText={setListName}
        maxLength={25}

        />
      <GenericButton name="Add List" pressHandler={exportAsList}/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color3,
    flex: 1,
    alignItems: 'center',
    padding: 15
  },
  label: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold'
  },
  textInput: {
    width: '75%',
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 5,
    margin: 10
  }
});
