import React from "react";
import { View } from "react-native";
import CategoryForm from "../CategoryForm/CategoryForm";

import useStyles from "./NewCategoryScreen.styles";
import { SafeAreaScreen } from "../../ui";
import { useCategories } from "../../../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CategoriesStackParamList } from "../../../navigation/navigation.types";

type NewCategoryScreenProps = NativeStackScreenProps<CategoriesStackParamList, "NewCategory">;

export default function NewCategoryScreen(props: NewCategoryScreenProps): JSX.Element {
  const styles = useStyles();
  const { navigation } = props;
  const { createNewCategory } = useCategories();

  function handleSubmit(values: CategoryFormData): void {
    createNewCategory(values, navigation.goBack);
  };

  return (
    <SafeAreaScreen style={styles.container} >
      <CategoryForm onSubmit={handleSubmit} />
    </SafeAreaScreen>
  );
};
