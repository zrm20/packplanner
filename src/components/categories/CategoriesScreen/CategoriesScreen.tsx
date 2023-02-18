import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { SafeAreaScreen } from "../../ui";

import useStyles from "./CategoriesScreen.styles";

interface CategoriesScreenProps {

};

export default function CategoriesScreen(props: CategoriesScreenProps): JSX.Element {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container} >
      <Text>Categories</Text>
    </SafeAreaScreen>
  );
};
