import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Text, IconButton, ActivityIndicator } from 'react-native-paper';

import useStyles from './InventoryList.styles';
import { useInventory } from '../../../hooks';
import CategorizedItemList from '../CategorizedItemList/CategorizedItemList';

export default function InventoryList(): JSX.Element {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { inventory, isLoading } = useInventory();

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text variant="headlineSmall">Inventory</Text>
        <IconButton
          accessibilityLabel="Add item"
          icon="plus"
          size={16}
          mode="outlined"
          style={styles.addButton}
          onPress={() => navigate('Locker', { screen: 'NewItem' })}
        />
      </View>

      <View style={styles.listContainer}>
        {isLoading ? <ActivityIndicator /> : <CategorizedItemList data={inventory} />}
      </View>
    </View>
  );
}
