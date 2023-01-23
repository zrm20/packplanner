import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { List, IconButton, ListItemProps } from "react-native-paper";
import QtyChanger from "../QtyChanger/QtyChanger";

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

  function renderRight(): JSX.Element {
    return inPack ? 
      <QtyChanger item={item} /> :
      <IconButton
        icon="plus"
        mode="outlined"
        onPress={toggleInPack}
      />;
  };

  function renderLeft(): JSX.Element | null {
    return inPack ? 
      <TouchableOpacity style={styles.checkmark} onPress={toggleInPack}>
        <List.Icon icon='check' />
      </TouchableOpacity> :
      null;
  };

  return (
    <TouchableOpacity {...props} >
      <List.Item style={styles.container}
        title={brand}
        description={name}
        right={renderRight}
        left={renderLeft}
        {...listItemProps}
      />
    </TouchableOpacity>
  );
};
