import React from "react";

import { SafeAreaScreen } from "../../ui";
import { PacksScroller } from "../../packs";
import InventoryList from "../InventoryList/InventoryList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LockerStackParamList } from "../../../navigation/navigation.types";

type InventoryScreenProps = NativeStackScreenProps<LockerStackParamList, 'Inventory'>;

export default function InventoryScreen(props: InventoryScreenProps): JSX.Element {

  return (
    <SafeAreaScreen >
      <PacksScroller />
      <InventoryList />
    </SafeAreaScreen>
  );
};
