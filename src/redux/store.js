import { configureStore } from "@reduxjs/toolkit";

import packsReducer from './packsSlice';

export default configureStore(
  {
    reducer: {
      packs: packsReducer
    }
  }
);