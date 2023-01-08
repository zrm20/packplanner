import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, View } from "react-native";
import { HelperText, IconButton, Text } from "react-native-paper";

import { usePacks } from "../../../hooks";
import PackItem from "../PackItem/PackItem";
import useStyles from "./PacksScroller.styles"

export default function PacksScroller(): JSX.Element {
  const { navigate } = useNavigation();
  const { packs } = usePacks();
  const styles = useStyles();

  function openNewPackScreen(): void {
    navigate('NewPack');
  };

  return (
    <View style={styles.container} >
      <View style={styles.toolbar}>
        <Text variant="titleLarge" >My Packs</Text>
        <View>
          <IconButton icon="plus" size={14} mode="outlined" onPress={openNewPackScreen} />
        </View>
      </View>

      <View style={styles.packsContainer}>
        {
          (!packs || packs.length === 0) ?
            <HelperText type="info" style={styles.emptyText}>No packs added yet</HelperText> :
            <FlatList
              data={packs}
              keyExtractor={item => item.id}
              renderItem={data => (
                <PackItem pack={data.item} />
              )}
              horizontal
            />
        }
      </View>
    </View>
  );
};