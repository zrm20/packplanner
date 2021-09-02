import React, { useState } from 'react'
import { View, Text , StyleSheet, Switch} from 'react-native'
import BasicSlider from '../components/BasicSlider';
import BasicSwitch from '../components/BasicSwitch';
import CategoryPieChart from '../components/CategoryPieChart';
import { colors } from '../styles/globalStyles';

export default function ChartsScreen() {

  const [baseWeightOnly, setBaseWeightOnly] = useState(false);
  const [includeWaterWeight, setIncludeWaterWeight] = useState(true);
  const [waterLevel, setWaterLevel] = useState(100)

  return (
    <View style={styles.container}>
      <View style={styles.charts}>
        <CategoryPieChart />
      </View>
      <View style={styles.chartLabels}>
        <Text>Labels Here</Text>
      </View>
      <View style={styles.chartSettings}>
        <View style={styles.switches}>
          <BasicSwitch 
            name='Base Weight Only' 
            value={baseWeightOnly}
            setValue={setBaseWeightOnly}
            />
          <BasicSwitch 
            name='Include Water Weight' 
            value={includeWaterWeight}
            setValue={setIncludeWaterWeight}
            />
        </View>
        <View>
          <BasicSlider name="Water Fill Levels" value={waterLevel} setValue={setWaterLevel}/>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color3,
    padding: 5,
  },
  chartSettings: {
    flex: 1,
  },
  charts: {
    flex: 3,
    borderBottomWidth: 1,
    borderBottomColor: colors.color1
  },
  chartLabels: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.color1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  switches: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
});
