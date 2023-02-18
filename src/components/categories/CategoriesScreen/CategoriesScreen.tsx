import React from "react";
import { FlatList, View } from "react-native";
import { Text, IconButton, Surface, List } from "react-native-paper";
import { useCategories } from "../../../hooks";

import { SafeAreaScreen } from "../../ui";

import useStyles from "./CategoriesScreen.styles";

interface CategoriesScreenProps {

};

export default function CategoriesScreen(props: CategoriesScreenProps): JSX.Element {
  const styles = useStyles();
  const { categories } = useCategories();

  return (
    <SafeAreaScreen>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text variant="titleLarge">Categories</Text>
          <IconButton icon="plus" size={14} mode="outlined" />
        </View>

        <View style={styles.listContainer}>
          <Surface style={styles.surface}>
            <FlatList
              data={categories}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <List.Item
                  style={styles.listItem}
                  key={item.id}
                  title={item.label}
                  left={props => <List.Icon icon={item.icon} />}
                  right={props => (
                    <View>
                      {
                        item.isStockCategory &&
                        <Text variant="labelSmall">Stock</Text>
                      }
                    </View>
                  )}
                />
              )}
            />
          </Surface>
        </View>
      </View>
    </SafeAreaScreen>
  );
};
