import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";

import useStyles from "./QtyChanger.styles";

interface QtyChangerProps {
  item: Item;
  size?: number;
};

export default function QtyChanger(props: QtyChangerProps): JSX.Element {
  const styles = useStyles();
  const { item, size = 24 } = props;

  function increment(): void {
    item.updateQty(item.qty + 1);
  };

  function decrement(): void {
    if (item.qty > 1) {
      item.updateQty(item.qty - 1);
    } else {
      item.toggleInPack();
    };
  };

  return (
    <View style={styles.container} >
      <IconButton
        icon="minus"
        onPress={decrement}
        style={styles.button}
        size={size}
      />
      <Text variant="bodyLarge">{item.qty}</Text>
      <IconButton
        icon="plus"
        onPress={increment}
        style={styles.button}
        size={size}
      />
    </View>
  );
};
