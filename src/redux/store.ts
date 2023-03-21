import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

import packsReducer from './packsSlice';
import inventoryReducer from "./inventorySlice";
import settingsReducer from "./settingsSlice";
import categoriesReducer from "./categoriesSlice";
import userReducer from "./userSlice";
import listReducer from "./listSlice";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ["user"]
};

const rootReducer = combineReducers(
  {
    packs: packsReducer,
    inventory: inventoryReducer,
    settings: settingsReducer,
    categories: categoriesReducer,
    user: userReducer,
    lists: listReducer,
  }
);

// const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore(
  {
    reducer: rootReducer,
    middleware: [thunk]
  }
);

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;