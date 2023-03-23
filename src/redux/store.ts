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
import myPackReducer from "./myPackSlice";
import alertReducer from "./alertSlice";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ["settings", "myPack"], // other slices will be persisted by Firebase
};

const rootReducer = combineReducers(
  {
    packs: packsReducer,
    inventory: inventoryReducer,
    myPack: myPackReducer,
    settings: settingsReducer,
    categories: categoriesReducer,
    user: userReducer,
    lists: listReducer,
    alert: alertReducer
  }
);

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: [thunk]
  }
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;