import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

import { inventory } from "../../archive/dummyData";

const initialState: InventorySliceState = { inventory };

const inventorySlice = createSlice(
  {
    name: 'inventory',
    initialState,
    reducers: {
      addItem: (state, action: PayloadAction<{ item: ItemFormData }>) => {
        const { item } = action.payload;

        if (!item) {
          throw new Error("No item recieved");
        };

        const newItem: ItemData = {
          ...item,
          id: uuid.v4() as string
        };

        state.inventory.push(newItem);
      },
      deleteItem: (state, action: PayloadAction<{ id: string }>) => {
        const { id } = action.payload;

        if (!id) {
          throw new Error("No item id recieved");
        };

        state.inventory = state.inventory.filter(item => item.id !== id);
      },
      updateItem: (state, action: PayloadAction<{ id: string, newValues: ItemFormData }>) => {
        const { id, newValues } = action.payload;

        if (!id) {
          throw new Error("No item id recieved");
        };

        if (!newValues) {
          throw new Error("newValues were not recieved");
        };

        const indexToUpdate = state.inventory.findIndex(item => item.id === id);

        if (indexToUpdate === -1) {
          throw new Error("Item with that ID was not found");
        };

        state.inventory[indexToUpdate] = {
          ...state.inventory[indexToUpdate],
          ...newValues,
          // ensure that id is unchanged
          id: state.inventory[indexToUpdate].id
        };
      },
      toggleInPack: (state, action: PayloadAction<{ id: string }>) => {
        const { id } = action.payload;

        if (!id) {
          throw new Error("No item id recieved");
        };

        const indexToUpdate = state.inventory.findIndex(item => item.id === id);

        if (indexToUpdate === -1) {
          throw new Error("Item with that ID was not found");
        };

        state.inventory[indexToUpdate].inPack = !state.inventory[indexToUpdate].inPack;
      }
    }
  }
);

export default inventorySlice.reducer;

export const { addItem, deleteItem, updateItem, toggleInPack } = inventorySlice.actions;
