import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { List, IconButton, ListItemProps } from "react-native-paper";

import useStyles from "./InventoryItem.styles"

interface InventoryItemProps extends TouchableOpacityProps {
  item: Item;
  listItemProps?: ListItemProps
};

export default function InventoryItem({ item, listItemProps, ...props }: InventoryItemProps): JSX.Element {
  const styles = useStyles();

  const {
    name,
    brand,
    inPack,
    toggleInPack
  } = item;

  return (
    <TouchableOpacity {...props} >
      <List.Item style={styles.container}
        title={brand}
        description={name}
        right={props => (
          <IconButton
            icon={inPack ? "minus" : "plus"}
            onPress={toggleInPack}
          />
        )}
        left={props =>
        (
          inPack &&
          <List.Icon icon='check' style={styles.checkmark} />
        )}
        {...listItemProps}
      />
    </TouchableOpacity>
  );
};
