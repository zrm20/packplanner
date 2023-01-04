import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, Surface, Title, Subheading } from "react-native-paper";

import useStyles from "./PackItem.styles"

export default function PackItem({ pack, ...props }) {
  const styles = useStyles();

  return (
    <TouchableOpacity onLongPress={pack.openEdit} onPress={pack.select} >
      <Surface style={[styles.container, pack.isSelected ? styles.selectedPack : null]} >
        <Title
          style={styles.title}
          adjustsFontSizeToFit
          numberOfLines={2}
        >
          {pack.brand}
        </Title>
        <Subheading
          style={styles.subheading}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {pack.model}
        </Subheading>
        <Text style={styles.weight}>{pack.weight}</Text>
      </Surface>
    </TouchableOpacity>
  );
};
