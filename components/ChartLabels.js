import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { colors } from '../styles/globalStyles';


function SingleLabel({ name, color }){

  return(
    <View style={styles.singleLabelContainer}>
      <View style={{...styles.labelSquare, backgroundColor: color}}></View>
      <Text style={styles.labelText}>{name}</Text>
    </View>
  )
}

export default function ChartLabels({ chartData }) {
  //chart data is an array of objects. each object has a value, an svg object with fill color, and a key. The key is a category key
  return (
    <ScrollView contentContainerStyle={styles.windowContainer}>
     {
       chartData.map((value) => {
         return(
           <SingleLabel name={value.name} color={value.color} key={value.key}/>
         )
       })
     }
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  singleLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%'
  },
  labelSquare: {
    width: 25,
    height: 25,
    margin: 5,
    borderRadius: 2
  },
  labelText: {
    color: colors.white,
    fontSize: 14
  },
  windowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    padding: 8
  },
  col: {
    width: '50%'
  }
});
