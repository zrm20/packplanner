import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SetSelectedPackPayload = PayloadAction<{ packId: string | null }>;

const initialState: MyPackSliceState = {
  selectedPack: null,
  itemsInPack: []
};

const myPackSlice = createSlice(
  {
    name: "myPack",
    initialState,
    reducers: {
      setSelectedPack(state, action: SetSelectedPackPayload) {
        if (state.selectedPack === action.payload.packId) {
          state.selectedPack = null;
        } else {
          state.selectedPack = action.payload.packId
        }
      },
    }
  }
);

export default myPackSlice.reducer;

export const { setSelectedPack } = myPackSlice.actions;