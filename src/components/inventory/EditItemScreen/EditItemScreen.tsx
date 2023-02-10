import React from "react";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";
import { FAB, Button, Title } from "react-native-paper";

import useStyles from "./EditItemScreen.styles";
import { SafeAreaScreen } from "../../ui";
import { useInventory } from "../../../hooks";
import { extractId, isAndroid } from "../../../utils";
import InventoryForm from "../InventoryForm/InventoryForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LockerStackParamList } from "../../../navigation/navigation.types";

type EditItemScreenProps = NativeStackScreenProps<LockerStackParamList, 'EditItem'>;

export default function EditItemScreen({ route, navigation }: EditItemScreenProps): JSX.Element {
  const styles = useStyles();
  const { getItemById } = useInventory();

  const itemId = extractId(route.params.item);
  const item = getItemById(itemId);

  if (!item) {
    <SafeAreaScreen style={styles.container}>
      <Title>Something went wrong</Title>
      <Button onPress={navigation.goBack}>Go Back</Button>
    </SafeAreaScreen>
  };

  function handleSubmit(newValues: ItemFormData): void {
    if (item) {
      item.update(newValues, () => navigation.navigate('Inventory'));
    }
  };

  function handleDelete(): void {
    if (item) {
      item.delete(navigation.goBack)
    }
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
        </View>

        {
          item?.baseFields &&
          <InventoryForm
            onSubmit={handleSubmit}
            initialValues={item.baseFields}
            submitText="Update Item"
            onDelete={handleDelete}
          />
        }
      </SafeAreaScreen>
    </TouchableWithoutFeedback>
  );
};
