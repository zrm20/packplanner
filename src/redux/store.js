import { configureStore } from "@reduxjs/toolkit";

import packsReducer from './packsSlice';
import inventoryReducer from "./inventorySlice";

export default configureStore(
  {
    reducer: {
      packs: packsReducer,
      inventory: inventoryReducer
    }
  }
);