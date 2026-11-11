import { useField } from 'formik';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { IconButton, Searchbar, Text } from 'react-native-paper';

import useStyles from './CategoryIconPicker.styles';
import icons from './iconsArray';

export default function CategoryIconPicker(): JSX.Element {
  const styles = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, util] = useField<string>('icon');
  const [search, setSearch] = useState('');

  function searchFilter(icon: string): boolean {
    return icon.includes(search.toLowerCase().replaceAll(' ', '-'));
  }

  return (
    <View style={styles.container}>
      <IconButton
        icon={field.value}
        accessibilityLabel={`Selected icon: ${field.value}`}
        mode="contained"
        size={32}
      />

      <View style={styles.searchBar}>
        <Searchbar value={search} onChangeText={setSearch} placeholder="Icon search" />
      </View>

      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.iconContent}>
        {!icons.some(searchFilter) && <Text>No matching icons. Try another search.</Text>}
        {icons.filter(searchFilter).map((item) => (
          <IconButton
            key={item}
            icon={item}
            size={22}
            style={{ margin: 2 }}
            accessibilityLabel={`Select ${item} icon`}
            accessibilityState={{ selected: item === field.value }}
            mode={item === field.value ? 'contained' : undefined}
            onPress={() => util.setValue(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
