import React from "react";
import { View } from "react-native";
import CategoryForm from "../CategoryForm/CategoryForm";

import useStyles from "./NewCategoryScreen.styles";
import { SafeAreaScreen } from "../../ui";
import { useCategories } from "../../../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CategoriesStackParamList } from "../../../navigation/navigation.types";
import useThrowAlert from "../../../hooks/alerts/useThrowAlert";

type NewCategoryScreenProps = NativeStackScreenProps<CategoriesStackParamList, "NewCategory">;

export default function NewCategoryScreen(props: NewCategoryScreenProps): JSX.Element {
  const styles = useStyles();
  const { navigation } = props;
  const { createNewCategory } = useCategories();
  const { catchUnknownError } = useThrowAlert();

  async function handleSubmit(values: CategoryFormData): Promise<void> {
    try {
      await createNewCategory(values, navigation.goBack);
    } catch (err) {
      catchUnknownError(err, "Failed to add category. Please try again")
    }
  };

  return (
    <SafeAreaScreen style={styles.container} >
      <CategoryForm onSubmit={handleSubmit} />
    </SafeAreaScreen>
  );
};
