import React from "react";
import { ScrollView } from "react-native";

import useStyles from "./NewItemScreen.styles";
import { ContainedModalTitle, SafeAreaScreen } from "../../ui";
import { useInventoryActions } from "../../../hooks";
import InventoryForm from "../InventoryForm/InventoryForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LockerStackParamList } from "../../../navigation/navigation.types";
import useThrowAlert from "../../../hooks/alerts/useThrowAlert";

type NewItemScreenProps = NativeStackScreenProps<LockerStackParamList, 'NewItem'>;

export default function NewItemScreen({ navigation }: NewItemScreenProps): JSX.Element {
  const styles = useStyles();
  const { addToInventory } = useInventoryActions();
  const { catchUnknownError } = useThrowAlert();

  async function handleSubmit(newItem: ItemFormData): Promise<void> {
    try {
      await addToInventory(newItem);
      navigation.navigate('Inventory');
    } catch (err) {
      catchUnknownError(err, "Failed to add new item. Please try again.")
    }
  };

  return (
    <SafeAreaScreen style={styles.container}>
      <ContainedModalTitle title="New Item" />
      <ScrollView style={styles.scrollView} >
        <InventoryForm onSubmit={handleSubmit} />
      </ScrollView>
    </SafeAreaScreen>
  );
};
