import React from 'react';
import { View, Text, StyleSheet, FlatList, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import GenericButton from './GenericButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

function IconItem({ icon, onSelect, onClose }) {

  function handleIconSelect() {
    onSelect(icon);
    onClose();
  };

  return (
    <TouchableOpacity style={styles.iconButton} onPress={handleIconSelect}>
      <MaterialCommunityIcons name={icon} size={36}/>
    </TouchableOpacity>
  );
};

export default function IconPicker({ onClose, iconList, onSelect, ...props }) {
  return (
    <Modal 
      {...props}
      transparent
      style={styles.root}
    >
      <View style={styles.window}>
        <Text style={styles.header}>Select Icon</Text>
        <FlatList 
          style={styles.body}
          data={iconList}
          keyExtractor={item => item}
          renderItem={({ item }) => (<IconItem icon={item} onSelect={onSelect} onClose={onClose}/>)}
          numColumns={5}
          columnWrapperStyle={styles.listCol}
        />
        <GenericButton name='Close' size={14} pressHandler={onClose}/>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  root: {
  },
  window: {
    backgroundColor: 'white',
    width: 300,
    height: 600,
    borderRadius: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '20%'
  },
  header: {
    textAlign: 'center',
    fontSize: 24
  },
  body: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5
  },
  listCol: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  iconButton: {
    marginTop: 3,
    marginBottom: 3,
  }
});
