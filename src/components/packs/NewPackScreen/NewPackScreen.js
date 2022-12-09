import React from "react";
import { Text } from "react-native-paper";

import { SafeAreaScreen } from "../../ui";
import useStyles from "./NewPackScreen.styles"

export default function NewPackScreen(props) {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container}>
      <Text variant="displayLarge">New Pack</Text>
    </SafeAreaScreen>
  );
};
