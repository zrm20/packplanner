import React from "react";
import { View, ViewStyle } from "react-native";
import { Text, Surface } from "react-native-paper";

import { useInventory } from "../../../hooks";
import { CategorizedItemList } from "../../inventory";
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
      {
        itemsInPack.length ?
          <Surface style={styles.listContainer}>
            <CategorizedItemList data={itemsInPack} itemProps={{ disabled: true }} />
          </Surface>
          :
          <Text variant="headlineMedium" style={styles.emptyText}>No Items in Pack</Text>
      }
    </View>
  );
};
