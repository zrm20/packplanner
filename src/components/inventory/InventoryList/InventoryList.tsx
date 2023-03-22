import React from "react";
import { View } from "react-native";
import { Text, IconButton, Surface } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import useStyles from "./InventoryList.styles"
import { useInventory } from "../../../hooks";
import CategorizedItemList from "../CategorizedItemList/CategorizedItemList";

export default function InventoryList(): JSX.Element {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { getSortedInventory, inventory } = useInventory();

  const sortedInventory = getSortedInventory(inventory);

  return (
    <View style={styles.container} >
      <View style={styles.toolbar}>
        <Text variant="titleLarge">Inventory</Text>

        <View style={styles.iconGroup}>
          {/* <IconButton icon="cloud-download" size={14} mode="outlined" /> TODO: Hold until cloud backup feature complete */}
          {/* <IconButton icon="tag" size={14} mode="outlined" /> TODO: Hold until category filter added */}
          <IconButton icon="plus" size={14} mode="outlined" onPress={() => navigate('Locker', { screen: 'NewItem' })} />
        </View>
      </View>

      <View style={styles.listContainer}>
        <Surface style={styles.listSurface} >
          <CategorizedItemList data={inventory} />
        </Surface>
      </View>
    </View>
  );
};
