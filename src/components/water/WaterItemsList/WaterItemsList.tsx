import React from "react";
import { View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { useInventory, useSettings } from "../../../hooks";

import useStyles from "./WaterItemsList.styles";

export default function WaterItemsList(): JSX.Element {
  const styles = useStyles();
  const { inventory } = useInventory();
  const { liquidUnit } = useSettings();
  const items = inventory.filter(item => item.liquidCapacity && item.liquidCapacity > 0);

  return (
    <View style={styles.container} >
      <Surface style={styles.surface}>
        <Text variant="titleMedium" style={styles.title}>Water Containers in Pack</Text>
        {
          items.map(item => (
            <Text variant="labelLarge" key={item.id}>
              ({item.qty}){Boolean(item.brand) && ' ' + item.brand} {item.name} - {liquidUnit.convert(item.liquidCapacity!)} {liquidUnit.label}
            </Text>
          ))
        }
      </Surface>
    </View>
  );
};
