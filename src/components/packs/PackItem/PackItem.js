import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, Surface, Title, Subheading } from "react-native-paper";

import useStyles from "./PackItem.styles"

export default function PackItem({ pack = {}, ...props }) {
  const { navigate } = useNavigation();

  const {
    brand = "Osprey",
    model = "Exos",
    weight = 4.1
  } = pack;

  const styles = useStyles();

  function navToEdit() {
    navigate('EditPack', { pack });
  };

  return (
    <TouchableOpacity onLongPress={navToEdit}>
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
    </TouchableOpacity>
  );
};
