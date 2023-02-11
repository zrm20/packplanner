import React from "react";
import { FlatList, View, Text } from "react-native";

import useStyles from "./CategorizedItemList.styles";
import InventoryItem from "../InventoryItem/InventoryItem";

interface CategorizedItemListProps {
  data: CategoryMap[];
  itemProps?: {
    disabled?: boolean,
    onPress?: () => void,
    onLongPress?: () => void
  }
};

export default function CategorizedItemList(props: CategorizedItemListProps): JSX.Element {
  const styles = useStyles();

  return (
    <FlatList
      keyExtractor={category => category.category}
      renderItem={data => {
        if (data.item.items.length > 0) {
          return (
            <View>
              <Text style={styles.catHeader}>{data.item.category}</Text>
              {
                data.item.items.map(item => (
                  <InventoryItem
                    item={item}
                    key={item.id}
                    onLongPress={item.openEdit}
                    {...props.itemProps}
                  />
                ))
              }
            </View>
          );
        } else {
          return null;
        }
      }}
      {...props}
    />
  );
};
