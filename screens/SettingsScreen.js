import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import UnitSelector from '../components/UnitSelector';
import { colors } from '../styles/globalStyles'
import { useSelector, useDispatch } from 'react-redux';
import { setWeightToMetric, setWeightToImperial, setWaterCapacityToMetric, setWaterCapacityToImperial } from '../redux/SettingsSlice'

export default function SettingsScreen() {

  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.value)
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Units</Text>
      <View>
        <UnitSelector 
          category='Weight' 
          state={settings.weightUnits} 
          setToMetric={() => dispatch(setWeightToMetric())}
          setToImperial={() => dispatch(setWeightToImperial())}
          />
        <UnitSelector 
          category='Water Capacity' 
          state={settings.waterCapacityUnits} 
          setToMetric={() => dispatch(setWaterCapacityToMetric())}
          setToImperial={() => dispatch(setWaterCapacityToImperial())}
          />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color3
  },
  headerText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold'
  },
  
});
