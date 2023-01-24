import React from "react";
import { View, ViewStyle } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { usePacks } from "../../../hooks";

import useStyles from "./MyPackHeader.styles";

interface MyPackHeaderProps {
  style?: ViewStyle;
}

export default function MyPackHeader(props: MyPackHeaderProps): JSX.Element {
  const styles = useStyles();
  const { selectedPack } = usePacks();

  if(!selectedPack) {
    return (
      <View style={[styles.emptyContainer, props.style]}>
        <Text variant="titleLarge" style={styles.emptyText}>
          No Pack Selected
        </Text>
        <Text>
          Select a pack by tapping on a pack in the Locker Tab
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, props.style]} >
      <Avatar.Icon icon="bag-personal"/>

      <View style={styles.dataContainer}>
        <Text variant="titleLarge" numberOfLines={1} adjustsFontSizeToFit>
          {selectedPack.brand} - {selectedPack.model}
        </Text>
        <Text variant="titleMedium" numberOfLines={1} adjustsFontSizeToFit>
          { // TODO Dynamically set unit types and labels
          }
          {selectedPack.capacity} Liters | {selectedPack.weight} kilograms
        </Text>
      </View>
    </View>
  );
};
