import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { CategoriesStackParamList } from "../../../navigation/navigation.types";
import { SafeAreaScreen } from "../../ui";
import useStyles from "./EditCategoryScreen.styles";

type EditCategoryScreenProps = NativeStackScreenProps<CategoriesStackParamList, "EditCategory">;

export default function EditCategoryScreen(props: EditCategoryScreenProps): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container} >
      <Text>Edit Category</Text>
    </SafeAreaScreen>
  );
};
