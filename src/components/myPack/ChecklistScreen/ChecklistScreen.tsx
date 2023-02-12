import React from "react";
import { FlatList, View } from "react-native";
import { Checkbox, Divider, List, Text } from "react-native-paper";

import useStyles from "./ChecklistScreen.styles";
import { SafeAreaScreen } from "../../ui";
import { useInventory } from "../../../hooks";
import { useTheme } from "../../../theme";

export default function ChecklistScreen(): JSX.Element {
  const styles = useStyles();
  const { colors } = useTheme()
  const { itemsInPack } = useInventory();

  itemsInPack.sort((a, b) => {
    return a.isPacked ? 1 : -1 // sort unpacked items to end
  });

  const totalItems = itemsInPack.length;
  const packedItems = itemsInPack.filter(item => item.isPacked).length

  return (
    <SafeAreaScreen style={styles.container} >
      <Text variant="headlineMedium" style={styles.title}>Trip Checklist</Text>
      <Text variant="labelLarge" style={styles.title}>{`${packedItems} of ${totalItems} packed`}</Text>

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
                    color={colors.tertiary}
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
