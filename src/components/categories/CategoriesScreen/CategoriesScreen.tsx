import React from "react";
import { FlatList, View } from "react-native";
import { Text, IconButton, Surface, List } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useCategories } from "../../../hooks";
import { SafeAreaScreen } from "../../ui";
import { CategoriesStackParamList } from "../../../navigation/navigation.types";

import useStyles from "./CategoriesScreen.styles";

type CategoriesScreenProps = NativeStackScreenProps<CategoriesStackParamList, 'CategoriesHome'>;

export default function CategoriesScreen(props: CategoriesScreenProps): JSX.Element {
  const styles = useStyles();
  const { categories } = useCategories();
  const { navigation } = props;

  function navToNewCategory() {
    navigation.navigate("NewCategory");
  };

  return (
    <SafeAreaScreen>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text variant="titleLarge">Categories</Text>
          <IconButton icon="plus" size={14} mode="outlined" onPress={navToNewCategory} />
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
