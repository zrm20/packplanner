import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PacksSliceState = {
  packs: [],
  isLoading: false
};

const packsSlice = createSlice(
  {
    name: 'packs',
    initialState,
    reducers: {
      setPacks(state, action: PayloadAction<{ packs: PackData[] }>) {
        state.packs = action.payload.packs;
      },
      setIsLoading(state, action: PayloadAction<boolean>) {
        state.isLoading = action.payload;
      }
    }
  }
);

export default packsSlice.reducer;

export const { setPacks, setIsLoading } = packsSlice.actions;