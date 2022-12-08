import React from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import CategoryItem from '../components/CategoryItem';
import GenericButton from '../components/GenericButton';
import { colors } from '../styles/globalStyles';

export default function EditCategoriesScreen({ navigation }) {

  const categories = useSelector(state => state.categories.value);

  function editCategory(category) {
    navigation.navigate('Edit Category', category)
  }
  function viewCategory(category){
    navigation.navigate('Category Items', category)
  }

  return (
    <View style={styles.container}>
      <GenericButton name="New Category" size={24} pressHandler={() => navigation.navigate('New Category')}/>
      <ScrollView style={styles.categoriesWindow}>
        {
          Object.keys(categories).map(key => <CategoryItem key={key} category={categories[key]} editHandler={editCategory} pressHandler={() => viewCategory(key)}/>)
        }
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color3,
    padding: 5,
    alignItems: 'center'
  },
  categoriesWindow: {
    width: '100%',
    flex: 1,
    padding: 3,
    margin: 3
  }
});