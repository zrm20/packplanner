import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

import { packs } from "../../archive/dummyData";

interface PackValues {
  brand: string;
  model: string;
  capacity: number;
  weight: number;
};

interface Pack extends PackValues {
  id: string;
};

interface InitialState {
  selectedPack: string | null;
  packs: Pack[]
};

const initialState: InitialState = {
  selectedPack: null,
  packs
};

const packsSlice = createSlice(
  {
    name: 'packs',
    initialState,
    reducers: {
      addPack: (state, action: PayloadAction<{ pack: PackValues }>) => {
        const { pack } = action.payload;
        if (!pack) {
          throw new Error('No pack included in payload')
        };

        const newPack: Pack = {
          ...pack,
          id: uuid.v4() as string
        };
        
        state.packs.push(newPack);
      },
      updatePack: (state, action: PayloadAction<{ id: string, newValues: PackValues}>) => {
        const { id, newValues } = action.payload;

        if (!id) {
          throw new Error('No pack id recieved to update')
        };

        const indexToUpdate = state.packs.findIndex(pack => pack.id === id);
        if (indexToUpdate === -1) {
          throw new Error('No pack with that id')
        };

        state.packs[indexToUpdate] = {
          ...state.packs[indexToUpdate],
          ...newValues,
          // ensure that the id goes unchanged
          id: state.packs[indexToUpdate].id
        };
      },
      deletePack: (state, action: PayloadAction<{ id: string }>) => {
        const { id } = action.payload;
        if (!id) {
          throw new Error('No pack id recieved to delete')
        };

        state.packs = state.packs.filter(pack => pack.id !== id);
      },
      toggleSelectedPack: (state, action: PayloadAction<{ id: string }>) => {
        const { id } = action.payload;
        if (state.selectedPack === id) {
          state.selectedPack = null;
        } else {
          state.selectedPack = id
        };
      }
    }
  }
);

export default packsSlice.reducer;

export const { addPack, updatePack, deletePack, toggleSelectedPack } = packsSlice.actions;