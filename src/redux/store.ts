import { configureStore } from "@reduxjs/toolkit";

import packsReducer from './packsSlice';
import inventoryReducer from "./inventorySlice";

const store = configureStore(
  {
    reducer: {
      packs: packsReducer,
      inventory: inventoryReducer
    }
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;