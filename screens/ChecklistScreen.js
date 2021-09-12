import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import ChecklistItem from '../components/ChecklistItem';
import { colors } from '../styles/globalStyles';


export default function ChecklistScreen() {
  const inventory = useSelector(state => state.inventory.value);

  //creates an array of packs that inPack is true
  let itemsInPack = inventory.filter(item => (item.inPack === true));

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Items To Pack:</Text>
      <ScrollView style={styles.scrollView}>
        {
          itemsInPack.map(item => <ChecklistItem item={item}/>)
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color3,
    alignItems: 'center'
  },
  titleText: {
    margin: 3,
    color: colors.white,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  scrollView: {
    backgroundColor: colors.color5,
    width: '95%',
    margin: 5,
    marginBottom: 10,
    borderRadius: 10,
    padding: 8
  }
});
