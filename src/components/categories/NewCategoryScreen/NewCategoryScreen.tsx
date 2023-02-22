import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import useStyles from "./NewCategoryScreen.styles";

interface NewCategoryScreenProps {

};

export default function NewCategoryScreen(props: NewCategoryScreenProps): JSX.Element {
  const styles = useStyles();

  return (
    <View style={styles.container} >
      <Text>New Category</Text>
    </View>
  );
};
