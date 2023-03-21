import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

type SetSelectedPackPayload = PayloadAction<{ id: string | null }>;

const initialState: PacksSliceState = {
  selectedPack: null,
  packs: []
};

const packsSlice = createSlice(
  {
    name: 'packs',
    initialState,
    reducers: {
      setPacks(state, action: PayloadAction<{ packs: PackData[] }>) {
        state.packs = action.payload.packs;
      },
      toggleSelectedPack: (state, action: PayloadAction<{ id: string }>) => {
        const { id } = action.payload;
        if (state.selectedPack === id) {
          state.selectedPack = null;
        } else {
          state.selectedPack = id
        };
      },
      setSelectedPack: (state, action: SetSelectedPackPayload) => {
        const { id } = action.payload;

        state.selectedPack = id || null;
      },
    }
  }
);

export default packsSlice.reducer;

export const { toggleSelectedPack, setSelectedPack, setPacks } = packsSlice.actions;