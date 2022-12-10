import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

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

        pack.id = uuid();

        state.packs.push(pack);
      },
      updatePack: (state, action) => {
        const { pack } = action.payload;
        if (!pack) {
          throw new Error('No pack included in payload')
        };

        const index = state.packs.findIndex(item => item.id);
        if (index === -1) {
          throw new Error('Could not find that pack')
        };

        state.packs[index] = pack;
      },
      deletePack: (state, action) => {
        const { pack } = action.payload;
        if (!pack) {
          throw new Error('No pack included in payload')
        };

        return state.packs.filter(item => item.id !== pack.id);
      }
    }
  }
);

export default packsSlice.reducer;

// export const { };