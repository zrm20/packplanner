import React from "react";
import { FlatList, View } from "react-native";
import { Text, Surface, List } from "react-native-paper";

import { useInventory } from "../../../hooks";
import useStyles from "./InPackList.styles";

export default function InPackList(): JSX.Element {
  const styles = useStyles();
  const { itemsInPack } = useInventory();

  return (
    <View style={styles.container} >
      <Text variant="labelLarge">In My Pack:</Text>
      <Surface style={styles.listContainer}>
        <FlatList
          data={itemsInPack}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <List.Item title={item.name} style={styles.li}/>
          )}
        />
      </Surface>
    </View>
  );
};
