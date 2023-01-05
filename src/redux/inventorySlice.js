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
      deleteItem: (state, action) => {
        const { id } = action.payload;

        if (!id) {
          throw new Error("No item id recieved");
        };

        state.inventory = state.inventory.filter(item => item.id !== id);
      },
      updateItem: (state, action) => {
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

export const { addItem, deleteItem, updateItem, toggleInPack } = inventorySlice.actions;
