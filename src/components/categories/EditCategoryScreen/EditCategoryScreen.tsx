import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useCategories, useDeleteCategory } from "../../../hooks";

import { CategoriesStackParamList } from "../../../navigation/navigation.types";
import { confirmDelete } from "../../../utils";
import { SafeAreaScreen } from "../../ui";
import CategoryForm from "../CategoryForm/CategoryForm";
import useStyles from "./EditCategoryScreen.styles";

type EditCategoryScreenProps = NativeStackScreenProps<CategoriesStackParamList, "EditCategory">;

export default function EditCategoryScreen(props: EditCategoryScreenProps): JSX.Element {
  const styles = useStyles();
  const { categoryId } = props.route.params;
  const { goBack } = props.navigation;
  const { getCategoryById } = useCategories();
  const deleteCategory = useDeleteCategory(categoryId);

  const category = getCategoryById(categoryId);

  if (!category) {
    return (
      <SafeAreaScreen style={styles.container}>
        <View style={styles.errorContainer}>
          <Text>Could not find a category with that id</Text>
          <Button onPress={goBack} mode='contained' >Go Back</Button>
        </View>
      </SafeAreaScreen>
    )
  };

  function handleSubmit(newValues: CategoryFormData): void {
    category?.update(newValues, goBack);
  };

  function handleDelete(): void {
    confirmDelete(
      deleteCategory,
      "This will permanently delete this category. All items assigned to this category will be set to \"Misc\"",
      () => props.navigation.navigate("CategoriesHome")
    );
  };

  return (
    <SafeAreaScreen style={styles.container} >
      <CategoryForm
        category={category}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </SafeAreaScreen>
  );
};
