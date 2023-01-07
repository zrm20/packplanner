import React from "react";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import { FAB, Button } from "react-native-paper";

import useStyles from "./EditItemScreen.styles";
import { SafeAreaScreen } from "../../ui";
import { useInventory } from "../../../hooks";
import { extractId, isAndroid } from "../../../utils";
import InventoryForm from "../InventoryForm/InventoryForm";

export default function EditItemScreen({ route, navigation, ...props }) {
  const styles = useStyles();
  const { getItemById } = useInventory();

  const itemId = extractId(route.params.item);
  const item = getItemById(itemId);

  function handleSubmit(newValues) {
    item.update(newValues, () => navigation.navigate('Inventory'));
  };

  function handleDelete() {
    item.delete(navigation.goBack)
  }

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
        </View>

        {
          item?.baseFields &&
          <InventoryForm
            onSubmit={handleSubmit}
            initialValues={item.baseFields}
            submitText="Update Item"
          />
        }

        <View style={styles.deleteContainer}>
          <Button
            style={styles.deleteButton}
            mode="contained"
            onPress={handleDelete}
          >
            Delete Item
          </Button>
        </View>
      </SafeAreaScreen>
    </TouchableWithoutFeedback>
  );
};
