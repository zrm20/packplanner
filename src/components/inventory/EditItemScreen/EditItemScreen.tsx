import React from "react";
import { ScrollView } from "react-native";
import { Button, Title } from "react-native-paper";

import useStyles from "./EditItemScreen.styles";
import { ContainedModalTitle, SafeAreaScreen } from "../../ui";
import { useInventory } from "../../../hooks";
import { extractId } from "../../../utils";
import InventoryForm from "../InventoryForm/InventoryForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LockerStackParamList } from "../../../navigation/navigation.types";
import useThrowAlert from "../../../hooks/alerts/useThrowAlert";

type EditItemScreenProps = NativeStackScreenProps<LockerStackParamList, 'EditItem'>;

export default function EditItemScreen({ route, navigation }: EditItemScreenProps): JSX.Element {
  const styles = useStyles();
  const { getItemById } = useInventory();
  const { catchUnknownError } = useThrowAlert();

  const itemId = extractId(route.params.item);
  const item = getItemById(itemId);

  if (!item) {
    <SafeAreaScreen style={styles.container}>
      <Title>Something went wrong</Title>
      <Button onPress={navigation.goBack}>Go Back</Button>
    </SafeAreaScreen>
  };

  async function handleSubmit(newValues: ItemFormData): Promise<void> {
    try {
      await item!.update(newValues);
      navigation.navigate('Inventory');
    } catch (err) {
      catchUnknownError(err, "Failed to update item. Please try again.")
    };
  };

  async function handleDelete(): Promise<void> {
    try {
      if (item) {
        await item.delete(); // TODO fix this async, navigation is happening before delete completes
        navigation.goBack();
      }
    } catch (err) {
      catchUnknownError(err, "Failed to delete item. Please try again.");
    };
  };

  return (
    <SafeAreaScreen style={styles.container}>
      <ContainedModalTitle title="Edit Item" />
      <ScrollView style={styles.scrollView}>
        {
          item?.baseFields &&
          <InventoryForm
            onSubmit={handleSubmit}
            initialValues={item.baseFields}
            submitText="Update Item"
            onDelete={handleDelete}
          />
        }
      </ScrollView>
    </SafeAreaScreen>
  );
};
