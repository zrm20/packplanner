import { createSlice } from "@reduxjs/toolkit";

import { inventory } from "../../archive/dummyData";

const inventorySlice = createSlice(
  {
    name: 'inventory',
    initialState: {
      inventory
    },
    reducers: {

    }
  }
);

export default inventorySlice.reducer;
