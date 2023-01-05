import React from "react";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import { FAB, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import useStyles from "./EditItemScreen.styles";
import { SafeAreaScreen } from "../../ui";
import { useInventory } from "../../../hooks";
import { extractId, isAndroid } from "../../../utils";
import InventoryForm from "../InventoryForm/InventoryForm";

export default function EditItemScreen({ route, ...props }) {
  const styles = useStyles();
  const { getItemById } = useInventory();
  const { navigate } = useNavigation();

  const itemId = extractId(route.params.item);
  const item = getItemById(itemId);

  function handleSubmit(newValues) {
    item.update(newValues, () => navigate('Locker'));
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

          <Title>Edit Item</Title>
        </View>

        {
          item?.baseFields &&
          <InventoryForm
            onSubmit={handleSubmit}
            initialValues={item.baseFields}
            submitText="Update Pack"
          />
        }
      </SafeAreaScreen>
    </TouchableWithoutFeedback>
  );
};
