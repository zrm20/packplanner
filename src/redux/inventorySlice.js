import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

import { inventory } from "../../archive/dummyData";

const inventorySlice = createSlice(
  {
    name: 'inventory',
    initialState: {
      inventory
    },
    reducers: {
      addItem: (state, action) => {
        const { item } = action.payload;

        if (!item) {
          throw new Error("No item recieved");
        };

        item.id = uuid.v4();
        state.inventory.push(item);
      },
      removeItem: (state, action) => {
        const { id } = action.payload;

        if (!id) {
          throw new Error("No item id recieved");
        };

        state.inventory = state.inventory.filter(item => item.id !== id);
      },
      updateItem: (state, action) => {
        const { id, newItem } = action.payload;

        if (!id) {
          throw new Error("No item id recieved");
        };

        if (!newItem) {
          throw new Error("newItem was not recieved");
        };

        const indexToUpdate = state.inventory.findIndex(item => item.id === id);

        if (indexToUpdate === -1) {
          throw new Error("Item with that ID was not found");
        };

        // ensure the original item id exists on the updated item object
        newItem.id = state.inventory[indexToUpdate].id;

        state.inventory[indexToUpdate] = newItem;
      },
      toggleInPack: (state, action) => {
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

export const { addItem, removeItem, updateItem, toggleInPack } = inventorySlice.actions;
