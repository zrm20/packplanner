import React from "react";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import { FAB, Title } from "react-native-paper";

import { isAndroid } from "../../../utils";
import { SafeAreaScreen } from "../../ui";
import { usePacks } from "../../../hooks";
import PackForm from "../PackForm/PackForm";
import useStyles from "./NewPackScreen.styles"

export default function NewPackScreen({ navigation, ...props }) {
  const styles = useStyles();
  const { addPack } = usePacks();

  function handleSubmit(pack) {
    addPack(pack);
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaScreen style={styles.container}>
        <View style={styles.titleContainer}>
          {
            isAndroid() &&
            <FAB
              icon="arrow-left"
              onPress={() => navigation.goBack()}
              style={styles.closeButton}
              size="small"
            />
          }

          <Title>New Pack</Title>
        </View>

        <PackForm onSubmit={handleSubmit} />
      </SafeAreaScreen>
    </TouchableWithoutFeedback>
  );
};
