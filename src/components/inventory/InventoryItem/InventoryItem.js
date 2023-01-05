import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { List, useTheme, IconButton } from "react-native-paper";

import useStyles from "./InventoryItem.styles"

export default function InventoryItem({ item = {}, onPress, onLongPress, ...props }) {
  const styles = useStyles();
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const {
    name = "Passage 2",
    brand = "REI",
    qty = 1,
    category = "shelter",
    inPack,
    toggleInPack
  } = item;

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} >
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
        {...props}
      />
    </TouchableOpacity>
  );
};
