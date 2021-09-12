import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../styles/globalStyles';
import LiquidContainerListItem from './LiquidContainerListItem';

export default function LiquidContainerList() {

  const inventory = useSelector(state => state.inventory.value);

  //create an array of liquid containers in pack
  let liquidContainers = [];
  for(let i = 0; i < inventory.length; i++){
    if(inventory[i].inPack && inventory[i].liquidCapacity){
      liquidContainers.push(inventory[i]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liquid Containers in Pack:</Text>
      <ScrollView style={styles.scrollView}>
        {
          liquidContainers.map(item => {
            return(
              <LiquidContainerListItem item={item} key={item.id}/>
            )
          })
        }
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 15
  },
  scrollView: {
    backgroundColor: colors.color5,
    flex: 1,
    borderRadius: 8,
    padding: 5
  },
  title: {
    color: colors.white,
    fontSize: 16,
    margin: 5
  }
});