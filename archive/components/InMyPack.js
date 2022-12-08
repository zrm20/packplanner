import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import { colors } from '../styles/globalStyles';
import InPackItem from './InPackItem';
import { kgToLbs } from '../globalFunctons'


function CategoryRow({ category, items }){

  const categories = useSelector(state => state.categories.value);
  const settings = useSelector(state => state.settings.value)

  let categoryWeight = 0;
  items.forEach(item => {
    if(item.category === category){
      categoryWeight += (item.weight * item.qty);
    }
  })

  let categoryWeightString;
  switch(settings.weightUnits){
    case('metric'): {
      categoryWeightString= categoryWeight.toFixed(2) + ' kg';
      break;
    }
    case('imperial'): {
      categoryWeightString = kgToLbs(categoryWeight).toFixed(2) + ' lbs';
      break;
    }
  }


  return (
    <View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{categories[category].label}: {categoryWeightString}</Text>
      </View>
      {
        items.map(item => item.category === category ? <InPackItem key={item.id} item={item} /> : null)
      }
    </View>
  )
};

export default function InMyPack({items}) {

  const categories = useSelector(state => state.categories.value)
  
  //create an empty array. For each item in items, if the array already contans the category, do nothing, if not, add that category to the array
  let activeCategories = [];

  items.forEach(item => {
    if(!activeCategories.includes(item.category)){
      activeCategories.push(item.category);
    }
  });


  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>In My Pack:</Text>
      <ScrollView style={styles.scrollView}>
        {
          activeCategories.map(category => {
            
            return(
              <CategoryRow key={category} category={category} items={items}/>
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
    width: '90%',
    marginBottom: 8,
  },
  scrollView: {
    backgroundColor: colors.color5,
    borderRadius: 10
  },
  titleText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3
  },
  itemContainer: {
    backgroundColor: 'red',
    marginVertical: 1,
    paddingHorizontal: 8,
  },
  itemText: {
    fontSize: 14
  },
  itemRow: {
    flexDirection: 'row'
  },
  categoryContainer: {
    backgroundColor: colors.color1,
  },
  categoryTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
