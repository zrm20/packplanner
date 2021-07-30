import { configureStore } from '@reduxjs/toolkit'
import packsReducer from './PacksSlice'
import inventoryReducer from './InventorySclice'
import settingsReducer from './SettingsSlice'
import categoriesReducer from './CategoriesSlice'

export default configureStore({
  reducer: {
    packs: packsReducer,
    inventory: inventoryReducer,
    settings: settingsReducer,
    categories: categoriesReducer
  },
})