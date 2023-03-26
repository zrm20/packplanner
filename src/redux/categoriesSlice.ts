import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import camelize from 'camelize-ts';
import uuid from 'react-native-uuid';

import { stockCategories } from "../constants";

type SetCategoriesPayload = PayloadAction<{ categories: CategoryData[] }>;

const initialState: CategorySliceState = {
  categories: stockCategories,
  isLoading: false
};

const categoriesSlice = createSlice(
  {
    name: 'categories',
    initialState,
    reducers: {
      setCategories(state, action: SetCategoriesPayload) {
        state.categories = [...stockCategories, ...action.payload.categories];
      },
      setIsLoading(state, action: PayloadAction<boolean>) {
        state.isLoading = action.payload;
      }
    }
  }
);

export default categoriesSlice.reducer;
export const { setCategories, setIsLoading } = categoriesSlice.actions;