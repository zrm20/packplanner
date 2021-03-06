import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../styles/globalStyles'
import { useSelector } from 'react-redux';
import PackDetailsHeader from '../components/PackDetailsHeader';
import WeightCounter from '../components/WeightCounter';
import PackActionButtonBar from '../components/PackActionButtonBar';
import InMyPack from '../components/InMyPack';
import { calcBaseWeight, calcTotalPlusWaterWeight, calcTotalWeight } from '../globalFunctons';

//TODO New Feature: Add goal weight and progress bar

export default function PackScreen({ navigation }) {

  const packs = useSelector(state => state.packs.value);
  const inventory = useSelector(state => state.inventory.value);
  const categories = useSelector(state => state.categories.value);
  
  //finds the pack in packs that isActive. There should only be one
  const activePack = packs.find(pack => pack.isActivePack === true);
  //creates an array of packs that inPack is true
  let itemsInPack = inventory.filter(item => (item.inPack === true));
  
  //creates an array for all categories that are listed as baseWeightExempt = true
  let baseWeightExemptCategories= [];
  
  //runs through the categories object, and adds the key (name) of each object that is baseWeightExempt to the array
  for(const[key, value] of Object.entries(categories)){
    if(value.baseWeightExempt){
      baseWeightExemptCategories.push(key);
    }
  };
  
 let totalWeight = calcTotalWeight(itemsInPack, activePack ? activePack : null);
 let baseWeight = calcBaseWeight(itemsInPack, baseWeightExemptCategories, activePack ? activePack : null);
 let totalPlusWater = calcTotalPlusWaterWeight(itemsInPack, activePack ? activePack : null);
  
  return (
    <View style={styles.container}>
      <PackDetailsHeader 
        activePack={activePack}/>
      <WeightCounter 
        total={totalWeight} 
        base={baseWeight} 
        totalPlusWater={totalPlusWater}/>
      <PackActionButtonBar 
        chartsPress={() => navigation.navigate('Charts')}
        checklistPress={() => navigation.navigate('Checklist')}
        exportPress={() => navigation.navigate('New List', {pack: activePack, items: itemsInPack})}
        importPress={() => navigation.navigate('Import List')}
        />
      <InMyPack 
        items={itemsInPack}/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.color3
  },

});
