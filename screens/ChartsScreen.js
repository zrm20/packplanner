import React, { useState } from 'react'
import { View, Text , StyleSheet, Switch} from 'react-native'
import BasicSlider from '../components/BasicSlider';
import BasicSwitch from '../components/BasicSwitch';
import CategoryPieChart from '../components/CategoryPieChart';
import { useSelector } from 'react-redux'
import { colors, pieChartColors } from '../styles/globalStyles';
import { calcWaterWeight } from '../globalFunctons';
import ChartLabels from '../components/ChartLabels';

export default function ChartsScreen() {

  const [baseWeightOnly, setBaseWeightOnly] = useState(false);
  const [includeWaterWeight, setIncludeWaterWeight] = useState(true);
  const [waterLevel, setWaterLevel] = useState(100)

  const inventory = useSelector(state => state.inventory.value);
  const categories = useSelector(state => state.categories.value);
  const itemsInPack = inventory.filter(item => item.inPack);

  //find all packs that isActivePack. If there is an active pack, set the first active packs weight to weight of pack.
  const activePacks = useSelector(state => state.packs.value)
    .filter(pack => pack.isActivePack);

  const weightOfPack = activePacks[0] ? activePacks[0].weight : 0;
  
  
  //calc total potential water weight
  let totalWaterWeight = 0;
  itemsInPack.forEach(item => {
    if(item.liquidCapacity){
      totalWaterWeight += calcWaterWeight(item.liquidCapacity * item.qty);
    }
  })

  //create activeCategories object
  let activeCategories = {
    liquidWeight: {
      label: 'Liquid Weight',
      totalItems: 1,
      totalWeight: includeWaterWeight ? totalWaterWeight * (waterLevel / 100) : 0
    },
    pack: {
      label: 'Pack',
      totalItems: 1,
      totalWeight: weightOfPack
    }
  };

  //Populate activeCategories by looping through itemsInPack and adding to the object
  for(let i=0; i < itemsInPack.length; i++){
    if(!activeCategories[itemsInPack[i].category]){
      //Add category to activeCategories if it doesn't already exist
        activeCategories[itemsInPack[i].category] = {
          totalItems: 0, 
          totalWeight: 0,
          label: categories[itemsInPack[i].category].label
        };
    }
    if(!baseWeightOnly){
      //All items count towards weight, so add all items
      activeCategories[itemsInPack[i].category].totalItems += itemsInPack[i].qty;
      activeCategories[itemsInPack[i].category].totalWeight += itemsInPack[i].weight * itemsInPack[i].qty;
    }else{
      //Only counting base weight. Only add items that are NOT baseWeightExempt
      if(!categories[itemsInPack[i].category].baseWeightExempt){
        activeCategories[itemsInPack[i].category].totalItems += itemsInPack[i].qty;
        activeCategories[itemsInPack[i].category].totalWeight += itemsInPack[i].weight * itemsInPack[i].qty;
        };
    }
  }

  // create array for pie data. Needs an array of objects with a value, svg object with fill color, and key
  let pieData = [];
  let colorCounter = 0;
  for(const [key, value] of Object.entries(activeCategories)){
    pieData.push({
        value: value.totalWeight,
        svg: { fill: pieChartColors[colorCounter]},
        key: key,
        label: value.label
    })
    colorCounter++;
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartSettings}>
        <View style={styles.switches}>
          <BasicSwitch 
            name='Base Weight Only' 
            value={baseWeightOnly}
            setValue={(value) => {
              setBaseWeightOnly(value);
              if(value){setIncludeWaterWeight(false);}
            }}
            />
          <BasicSwitch 
            name='Include Liquid Weight' 
            value={includeWaterWeight}
            setValue={setIncludeWaterWeight}
            />
        </View>
        <View>
          <BasicSlider name="Liquid Fill Levels" value={waterLevel} setValue={setWaterLevel}/>
        </View>
      </View>
      <View style={styles.charts}>
        {/* <CategoryPieChart chartData={pieData}/> */}
      </View>
      <View style={styles.chartLabels}>
        {/* <ChartLabels chartData={pieData}/> */}
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
    borderBottomWidth: 1,
    borderBottomColor: colors.color1,
  },
  charts: {
    borderBottomWidth: 1,
    borderBottomColor: colors.color1,
    height: '50%'
  },
  chartLabels: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  switches: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
});
