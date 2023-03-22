import React from "react";
import { TouchableWithoutFeedback, View, Keyboard } from "react-native";

import useStyles from "./NewItemScreen.styles";
import { CloseScreenButton, SafeAreaScreen } from "../../ui";
import { useInventoryActions } from "../../../hooks";
import InventoryForm from "../InventoryForm/InventoryForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LockerStackParamList } from "../../../navigation/navigation.types";

type NewItemScreenProps = NativeStackScreenProps<LockerStackParamList, 'NewItem'>;

export default function NewItemScreen({ navigation }: NewItemScreenProps): JSX.Element {
  const styles = useStyles();
  const { addToInventory } = useInventoryActions();

  function handleSubmit(newItem: ItemFormData): void {
    addToInventory(newItem);
    navigation.navigate('Inventory');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaScreen style={styles.container}>
        <CloseScreenButton androidOnly />

        <InventoryForm onSubmit={handleSubmit} />
      </SafeAreaScreen>
    </TouchableWithoutFeedback>
  );
};
