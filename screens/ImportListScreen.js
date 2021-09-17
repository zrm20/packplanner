import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import ListItem from '../components/ListItem';
import { colors } from '../styles/globalStyles';

export default function ImportListScreen({ navigation }) {

  const lists = useSelector(state => state.lists.value);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Lists</Text>
      <ScrollView style={styles.scrollView}>
        {
          lists.map(list => 
            (<ListItem key={list.id} list={list} goBack={() => navigation.goBack()}/>))
        }
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.color3,
    padding: 8
  },
  title: {
    color: colors.white,
    fontSize: 18,
  },
  scrollView: {
    backgroundColor: colors.color5,
    width: '100%',
    margin: 5,
    padding: 5,
    borderRadius: 8
  }
});