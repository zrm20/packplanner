import React from "react";
import { View, FlatList } from "react-native";
import { Text, IconButton, Surface } from "react-native-paper";

import useStyles from "./InventoryList.styles"
import { inventory } from "../../../../archive/dummyData";
import InventoryItem from "../InventoryItem/InventoryItem";
import { useNavigation } from "@react-navigation/native";

export default function InventoryList(props) {
  const styles = useStyles();
  const { navigate } = useNavigation();

  return (
    <View style={styles.container} >
      <View style={styles.toolbar}>
        <Text variant="titleLarge">Inventory</Text>

        <View style={styles.iconGroup}>
          <IconButton icon="cloud-download" size={14} mode="outlined" />
          <IconButton icon="tag" size={14} mode="outlined" />
          <IconButton icon="plus" size={14} mode="outlined" onPress={() => navigate("NewItem")} />
        </View>
      </View>

      <Surface style={styles.listContainer}>
        <FlatList
          data={inventory}
          keyExtractor={item => item.id}
          renderItem={data => <InventoryItem item={data.item} />}
        />
      </Surface>
    </View>
  );
};
