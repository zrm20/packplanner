import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PacksSliceState = {
  packs: []
};

const packsSlice = createSlice(
  {
    name: 'packs',
    initialState,
    reducers: {
      setPacks(state, action: PayloadAction<{ packs: PackData[] }>) {
        state.packs = action.payload.packs;
      }
    }
  }
);

export default packsSlice.reducer;

export const { setPacks } = packsSlice.actions;