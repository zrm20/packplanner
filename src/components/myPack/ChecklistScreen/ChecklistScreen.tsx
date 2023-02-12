import React from "react";
import { FlatList, View } from "react-native";
import { Checkbox, Divider, List, Text } from "react-native-paper";

import useStyles from "./ChecklistScreen.styles";
import { SafeAreaScreen } from "../../ui";
import { useInventory } from "../../../hooks";

export default function ChecklistScreen(): JSX.Element {
  const styles = useStyles();
  const { itemsInPack } = useInventory();

  itemsInPack.sort((a, b) => {
    return a.isPacked ? 1 : -1 // sort unpacked items to end
  });

  return (
    <SafeAreaScreen style={styles.container} >
      <Text variant="headlineMedium" style={styles.title}>Trip Checklist</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={itemsInPack}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <>
              <List.Item
                title={`(${item.qty}) ${item.name}`}
                description={item.brand ? item.brand : null}
                left={props => (
                  <Checkbox.Android
                    status={item.isPacked ? "checked" : "unchecked"}
                    onPress={item.toggleIsPacked}
                  />
                )}
              />
              <Divider />
            </>
          )}
        />
      </View>
    </SafeAreaScreen>
  );
};
