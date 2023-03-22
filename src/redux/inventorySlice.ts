import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InventorySliceState = { inventory: [] };

const inventorySlice = createSlice(
  {
    name: 'inventory',
    initialState,
    reducers: {
      setInventory(state, action: PayloadAction<{ inventory: ItemData[] }>) {
        state.inventory = action.payload.inventory;
      }
    }
  }
);

export default inventorySlice.reducer;

export const { setInventory } = inventorySlice.actions;
