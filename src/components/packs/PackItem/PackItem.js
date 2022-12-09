import React from "react";
import { Text, Surface, Title, Subheading } from "react-native-paper";

import useStyles from "./PackItem.styles"

export default function PackItem({ pack = {}, ...props }) {
  const {
    brand = "Osprey",
    model = "Exos",
    weight = 4.1
  } = pack;

  const styles = useStyles();

  return (
    <Surface style={styles.container} >
      <Title
        style={styles.title}
        adjustsFontSizeToFit
        numberOfLines={2}
      >
        {brand}
      </Title>
      <Subheading
        style={styles.subheading}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {model}
      </Subheading>
      <Text style={styles.weight}>{weight}</Text>
    </Surface>
  );
};
