import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";

import useStyles from "./PacksScroller.styles"

export default function PacksScroller(props) {
  const { navigate } = useNavigation()
  const styles = useStyles();

  function openNewPackScreen() {
    navigate('NewPack');
  };

  return (
    <View style={styles.container} >
      <View style={styles.toolbar}>
        <Text variant="titleLarge" >My Packs</Text>
        <View styles={styles.iconGroup}>
          <IconButton icon="plus" size={14} mode="outlined" onPress={openNewPackScreen} />
        </View>
      </View>
    </View>
  );
};