import { configureStore } from '@reduxjs/toolkit'
import packsReducer from './PacksSlice'
import inventoryReducer from './InventorySclice'

export default configureStore({
  reducer: {
    packs: packsReducer,
    inventory: inventoryReducer
  },
})