import React, { useMemo } from "react";
import { FlatList, Text } from "react-native";

import useStyles from "./CategorizedItemList.styles";
import InventoryItem from "../InventoryItem/InventoryItem";

interface CategorizedItemListProps {
  data: Item[];
  itemProps?: {
    disabled?: boolean,
    onPress?: () => void,
    onLongPress?: () => void
  }
};

export default function CategorizedItemList(props: CategorizedItemListProps): JSX.Element {
  const styles = useStyles();
  const { data } = props;

  const sortedInventory = data.sort((a, b) => {
    const catA = a.category.label;
    const catB = b.category.label;

    if (catA < catB) {
      return -1
    } else if (catA > catB) {
      return 1
    } else {
      return 0
    };
  });

  return (
    <FlatList
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => {
        if (item.category.id !== props.data[index - 1]?.category.id) {
          return <>
            <Text style={styles.catHeader}>{item.category.label}</Text>
            <InventoryItem item={item} onPress={item.openEdit} />
          </>
        } else {
          return <InventoryItem item={item} onPress={item.openEdit} />
        }
      }}
      {...props}
      data={sortedInventory}
    />
  );
};
