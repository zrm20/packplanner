import { useField } from 'formik';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { IconButton, Searchbar } from 'react-native-paper';

import useStyles from './CategoryIconPicker.styles';
import icons from './iconsArray';

interface CategoryIconPickerProps {}

export default function CategoryIconPicker(props: CategoryIconPickerProps): JSX.Element {
  const styles = useStyles();
  const [field, meta, util] = useField<string>('icon');
  const [search, setSearch] = useState('');

  function searchFilter(icon: string): boolean {
    return icon.includes(search.toLowerCase().replaceAll(' ', '-'));
  }

  return (
    <View style={styles.container}>
      <IconButton icon={field.value} disabled size={50} />

      <View style={styles.searchBar}>
        <Searchbar value={search} onChangeText={setSearch} placeholder="Icon search" />
      </View>

      <FlatList
        data={icons.filter(searchFilter)}
        keyExtractor={(item) => item}
        numColumns={6}
        renderItem={({ item }) => <IconButton icon={item} onPress={() => util.setValue(item)} />}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}
