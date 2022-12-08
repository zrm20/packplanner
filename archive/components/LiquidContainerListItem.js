import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { mLToFlOz } from '../globalFunctons';
import { colors } from '../styles/globalStyles';

export default function LiquidContainerListItem({ item }) {

  const settings = useSelector(state => state.settings.value);

  //set capacity string
  let capacityString;
  switch(settings.liquidCapacityUnits){
    case('metric'): capacityString = item.liquidCapacity.toFixed(0) + ' mL'; break;
    case('imperial'): capacityString = mLToFlOz(item.liquidCapacity).toFixed(1) + ' fl oz'; break;
  };

  const itemString = `(${item.qty}) ${item.brand ? item.brand + ' ': null}${item.name} - ${capacityString}`;

  return (
    <View styles={styles.container}>
      <Text style={styles.text}>{itemString}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: colors.color3,
    borderBottomWidth: 3
  },
  text: {
    fontSize: 14,
    color: colors.color4,
    margin: 2
  }
});