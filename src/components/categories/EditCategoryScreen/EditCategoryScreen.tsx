import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useCategories, useDeleteCategory } from "../../../hooks";
import useThrowAlert from "../../../hooks/alerts/useThrowAlert";

import { CategoriesStackParamList } from "../../../navigation/navigation.types";
import { confirmDelete } from "../../../utils";
import { ContainedModalTitle, SafeAreaScreen } from "../../ui";
import CategoryForm from "../CategoryForm/CategoryForm";
import useStyles from "./EditCategoryScreen.styles";

type EditCategoryScreenProps = NativeStackScreenProps<CategoriesStackParamList, "EditCategory">;

export default function EditCategoryScreen(props: EditCategoryScreenProps): JSX.Element {
  const styles = useStyles();
  const { categoryId } = props.route.params;
  const { goBack } = props.navigation;
  const { getCategoryById } = useCategories();
  const deleteCategory = useDeleteCategory(categoryId);
  const { catchUnknownError } = useThrowAlert();

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

  async function handleSubmit(newValues: CategoryFormData): Promise<void> {
    try {
      await category?.update(newValues);
      goBack();
    } catch (err) {
      catchUnknownError(err, "Failed to update category. Please try again.")
    }
  };

  async function handleDelete(): Promise<void> {
    try {
      confirmDelete(
        deleteCategory,
        "This will permanently delete this category. All items assigned to this category will be set to \"Misc\"",
        () => props.navigation.navigate("CategoriesHome")
      );
    } catch (err) {
      catchUnknownError(err, "Failed to delete category. Please try again.")
    }
  };

  return (
    <SafeAreaScreen style={styles.container} >
      <ContainedModalTitle title="Edit Custom Category" />
      <CategoryForm
        category={category}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </SafeAreaScreen>
  );
};
