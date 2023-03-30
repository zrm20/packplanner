import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import alertReducer from './alertSlice';
import categoriesReducer from './categoriesSlice';
import inventoryReducer from './inventorySlice';
import listReducer from './listSlice';
import myPackReducer from './myPackSlice';
import packsReducer from './packsSlice';
import settingsReducer from './settingsSlice';
import userReducer from './userSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['settings', 'myPack'], // other slices will be persisted by Firebase
};

const rootReducer = combineReducers({
  packs: packsReducer,
  inventory: inventoryReducer,
  myPack: myPackReducer,
  settings: settingsReducer,
  categories: categoriesReducer,
  user: userReducer,
  lists: listReducer,
  alert: alertReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
