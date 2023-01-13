import React from "react";
import { View, FlatList } from "react-native";
import { Text, IconButton, Surface } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import useStyles from "./InventoryList.styles"
import InventoryItem from "../InventoryItem/InventoryItem";
import { useInventory } from "../../../hooks";

export default function InventoryList(): JSX.Element {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { inventory } = useInventory();

  return (
    <View style={styles.container} >
      <View style={styles.toolbar}>
        <Text variant="titleLarge">Inventory</Text>

        <View style={styles.iconGroup}>
          <IconButton icon="cloud-download" size={14} mode="outlined" />
          <IconButton icon="tag" size={14} mode="outlined" />
          <IconButton icon="plus" size={14} mode="outlined" onPress={() => navigate('Locker', { screen: 'NewItem'})} />
        </View>
      </View>

      <View style={styles.listContainer}>
        <Surface style={styles.listSurface} >
          <FlatList
            data={inventory}
            keyExtractor={item => item.id}
            renderItem={data => (
              <InventoryItem
                item={data.item}
                onPress={data.item.openEdit}
              />
            )}
          />
        </Surface>
      </View>
    </View>
  );
};
