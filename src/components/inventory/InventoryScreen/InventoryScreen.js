import React from "react";

import useStyles from "./InventoryScreen.styles";
import { SafeAreaScreen } from "../../ui";
import { Text } from "react-native-paper";

export default function InventoryScreen(props) {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container} alignCenter justifyCenter >
      <Text>Hello World</Text>
    </SafeAreaScreen>
  );
};
