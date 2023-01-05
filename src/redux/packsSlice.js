import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

import { packs } from "../../archive/dummyData";

const packsSlice = createSlice(
  {
    name: 'packs',
    initialState: {
      selectedPack: null,
      packs
    },
    reducers: {
      addPack: (state, action) => {
        const { pack } = action.payload;
        if (!pack) {
          throw new Error('No pack included in payload')
        };

        pack.id = uuid.v4();
        state.packs.push(pack);
      },
      updatePack: (state, action) => {
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
      deletePack: (state, action) => {
        const { id } = action.payload;
        if (!id) {
          throw new Error('No pack id recieved to delete')
        };

        state.packs = state.packs.filter(pack => pack.id !== id);
      },
      toggleSelectedPack: (state, action) => {
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