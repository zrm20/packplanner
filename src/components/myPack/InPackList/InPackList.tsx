import React from "react";
import { FlatList, View, ViewStyle } from "react-native";
import { Text, Surface, List } from "react-native-paper";

import { useInventory } from "../../../hooks";
import useStyles from "./InPackList.styles";

interface InPackListProps {
  style?: ViewStyle;
};

export default function InPackList(props: InPackListProps): JSX.Element {
  const styles = useStyles();
  const { itemsInPack } = useInventory();

  return (
    <View style={[styles.container, props.style]} >
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
