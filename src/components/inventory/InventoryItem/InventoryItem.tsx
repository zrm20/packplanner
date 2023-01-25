import React from "react";
import { TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import QtyChanger from "../QtyChanger/QtyChanger";
import useStyles from "./InventoryItem.styles"

interface InventoryItemProps extends TouchableOpacityProps {
  item: Item;
  style?: ViewStyle;
};

export default function InventoryItem({ item, ...props }: InventoryItemProps): JSX.Element {
  const styles = useStyles();

  const {
    name,
    brand,
    inPack,
    liquidCapacity,
    toggleInPack,
    getWeight,
    getLiquidCapacity
  } = item;

  return (
    <TouchableOpacity {...props} >
      <View style={[styles.container, props.style]}>
        <View style={styles.leftContainer}>
          {
            inPack ?
              <QtyChanger item={item} /> :
              <IconButton
                icon="plus"
                mode="outlined"
                onPress={toggleInPack}
              />
          }
        </View>
        <View style={styles.textContainer}>
          <Text variant="titleMedium" numberOfLines={1}>{brand}</Text>
          <Text variant="titleSmall" numberOfLines={1}>{name}</Text>
        </View>
        <View style={styles.weightContainer}>
          <Text>{getWeight()}</Text>
          {
            liquidCapacity &&
            <Text>{getLiquidCapacity()}</Text>
          }
        </View>
      </View>
    </TouchableOpacity>
  );
};
