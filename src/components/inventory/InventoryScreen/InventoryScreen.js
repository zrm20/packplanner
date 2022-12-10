import React from "react";

import useStyles from "./InventoryScreen.styles";
import { SafeAreaScreen } from "../../ui";
import { Text } from "react-native-paper";
import { PacksScroller } from "../../packs";
import InventoryList from "../InventoryList/InventoryList";

export default function InventoryScreen(props) {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container} >
      <PacksScroller />
      <InventoryList />
    </SafeAreaScreen>
  );
};
