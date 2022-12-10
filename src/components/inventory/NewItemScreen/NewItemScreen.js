import React from "react";
import { View } from "react-native";
import { Title } from "react-native-paper";

import useStyles from "./NewItemScreen.styles"

export default function NewItemScreen(props) {
  const styles = useStyles();

  return (
    <View style={styles.container} >
      <Title>New Item</Title>
    </View>
  );
};
