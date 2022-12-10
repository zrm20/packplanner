import React from "react";
import { View } from "react-native";
import { Text, Title } from "react-native-paper";

import { SafeAreaScreen } from "../../ui";
import PackForm from "../PackForm/PackForm";
import useStyles from "./NewPackScreen.styles"

export default function NewPackScreen(props) {
  const styles = useStyles();

  return (
    <SafeAreaScreen style={styles.container}>
      <View style={styles.titleContainer}>
        <Title>New Pack</Title>
      </View>

      <PackForm />
    </SafeAreaScreen>
  );
};
