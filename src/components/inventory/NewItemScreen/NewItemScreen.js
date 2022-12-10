import React from "react";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import { FAB, Title } from "react-native-paper";
import { useDispatch } from "react-redux";

import useStyles from "./NewItemScreen.styles";
import { SafeAreaScreen } from "../../ui";
import { isAndroid } from "../../../utils";
import InventoryForm from "../InventoryForm/InventoryForm";

export default function NewItemScreen(props) {
  const styles = useStyles();

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

          <Title>New Item</Title>
        </View>

        <InventoryForm />
      </SafeAreaScreen>
    </TouchableWithoutFeedback>
  );
};
