import { configureStore } from "@reduxjs/toolkit";

import packsReducer from './packsSlice';
import inventoryReducer from "./inventorySlice";
import settingsReducer from "./settingsSlice";
import categoriesReducer from "./categoriesSlice";
import userReducer from "./userSlice";
import listReducer from "./listSlice";

const store = configureStore(
  {
    reducer: {
      packs: packsReducer,
      inventory: inventoryReducer,
      settings: settingsReducer,
      categories: categoriesReducer,
      user: userReducer,
      lists: listReducer,
    }
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;