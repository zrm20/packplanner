import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { kgToLbs } from '../globalFunctons';
import { colors } from '../styles/globalStyles';

export default function WeightCounter({total, base, totalPlusWater}) {

  const settings = useSelector(state => state.settings.value);

  let baseWeightString;
  let totalWeightString;
  let totalPlusWaterString;

  switch(settings.weightUnits){
    case('metric'): {
      baseWeightString = base.toFixed(2) + ' kg';
      totalWeightString = total.toFixed(2) + ' kg';
      totalPlusWaterString = totalPlusWater.toFixed(2) + ' kg';
      break;
    }
    case('imperial'): {
      baseWeightString = kgToLbs(base).toFixed(2) + ' lbs';
      totalWeightString = kgToLbs(total).toFixed(2) + ' lbs';
      totalPlusWaterString = kgToLbs(totalPlusWater).toFixed(2) + ' lbs';
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.category}>
        <Text style={styles.headerText}>Base Weight</Text> 
        <Text style={styles.valueText}>{baseWeightString}</Text>
      </View>
      <View style={styles.categoryMiddle}>
        <Text style={styles.headerText}>Total Weight</Text> 
        <Text style={styles.valueText}>{totalWeightString}</Text>
      </View>
      <View style={styles.category}>
        <Text style={styles.headerText}>Total + Water</Text> 
        <Text style={styles.valueText}>{totalPlusWaterString}</Text>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.color4,
    borderRadius: 10
  },
  category: {
    margin: 10,
    alignItems: 'center'
  },
  categoryMiddle: {
    margin: 10,
    alignItems: 'center',
    borderColor: colors.color1,
    paddingHorizontal: 10,
    borderLeftWidth: 2,
    borderRightWidth: 2
  },
  headerText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  valueText: {
    color: colors.color5,
    fontSize: 18,
    fontWeight: 'bold'
  }
});