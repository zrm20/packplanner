import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import packsReducer from './PacksSlice';
import inventoryReducer from './InventorySlice';
import settingsReducer from './SettingsSlice';
import categoriesReducer from './CategoriesSlice';
import listsReducer from './ListsSlice';

const reducers = combineReducers({
  packs: packsReducer,
  inventory: inventoryReducer,
  settings: settingsReducer,
  categories: categoriesReducer,
  lists: listsReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})