import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { IconButton, List, useTheme } from "react-native-paper";

import useStyles from "./InventoryItem.styles"

export default function InventoryItem({ item = {}, ...props }) {
  const styles = useStyles();
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const {
    name = "Passage 2",
    brand = "REI",
    qty = 1,
    category = "shelter"
  } = item;

  return (
    <List.Item style={styles.container}
      title={brand}
      description={name}
      right={props => <List.Icon icon="plus" size={15} color={colors.primary} />}
    />
  );
};
