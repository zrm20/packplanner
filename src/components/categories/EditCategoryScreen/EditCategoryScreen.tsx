import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useCategories } from "../../../hooks";

import { CategoriesStackParamList } from "../../../navigation/navigation.types";
import { SafeAreaScreen } from "../../ui";
import CategoryForm from "../CategoryForm/CategoryForm";
import useStyles from "./EditCategoryScreen.styles";

type EditCategoryScreenProps = NativeStackScreenProps<CategoriesStackParamList, "EditCategory">;

export default function EditCategoryScreen(props: EditCategoryScreenProps): JSX.Element {
  const styles = useStyles();
  const { categoryId } = props.route.params;
  const { goBack } = props.navigation;
  const { getCategoryById } = useCategories();

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
    category?.delete(goBack);
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
