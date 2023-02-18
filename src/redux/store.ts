import { configureStore } from "@reduxjs/toolkit";

import packsReducer from './packsSlice';
import inventoryReducer from "./inventorySlice";
import settingsReducer from "./settingsSlice";
import categoriesReducer from "./categoriesSlice";

const store = configureStore(
  {
    reducer: {
      packs: packsReducer,
      inventory: inventoryReducer,
      settings: settingsReducer,
      categories: categoriesReducer
    }
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;