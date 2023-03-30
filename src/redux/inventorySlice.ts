import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: InventorySliceState = { inventory: [], isLoading: false };

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventory(state, action: PayloadAction<{ inventory: ItemData[] }>) {
      state.inventory = action.payload.inventory;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export default inventorySlice.reducer;

export const { setInventory, setIsLoading } = inventorySlice.actions;
