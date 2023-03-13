import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import camelize from 'camelize-ts';
import uuid from 'react-native-uuid';

import { stockCategories } from "../constants";

const initialState: CategorySliceState = {
  categories: stockCategories
};

const categoriesSlice = createSlice(
  {
    name: 'categories',
    initialState,
    reducers: {
      addCategory: (state, action: PayloadAction<{ newCategory: CategoryFormData }>) => {
        const { newCategory } = action.payload;

        if (!newCategory) {
          throw new Error('No newCategory received');
        };

        const categoryWithSameName = state.categories.find(category => category.label === newCategory.label);

        if (categoryWithSameName) {
          throw new Error(`A category with the name ${newCategory.label} already exists`);
        };

        const newCategoryData: CategoryData = {
          ...newCategory,
          value: camelize(newCategory.label),
          id: uuid.v4() as string,
          isStockCategory: false
        };

        state.categories.push(newCategoryData);
      },
      removeCategory: (state, action: PayloadAction<{ id: string }>) => {
        const { id } = action.payload;

        if (!id) {
          throw new Error('No category id received');
        };

        state.categories = state.categories.filter(category => category.id !== id);
      },
      updateCategory: (state, action: PayloadAction<{ id: string, newValues: CategoryFormData }>) => {
        const { id, newValues } = action.payload;

        if (!id || !newValues) {
          throw new Error('Missing id or newValues');
        };

        const indexToUpdate = state.categories.findIndex(category => category.id === id);

        if (indexToUpdate === -1) {
          throw new Error(`No category with id ${id} found`);
        };

        const newCategoryData: CategoryData = {
          ...state.categories[indexToUpdate], // spread old values
          ...newValues, // overwrite new values
          value: camelize(newValues.label),
          id: state.categories[indexToUpdate].id // ensure that original id is not changed
        };

        state.categories[indexToUpdate] = newCategoryData;
      }
    }
  }
);

export default categoriesSlice.reducer;
export const { addCategory, removeCategory, updateCategory } = categoriesSlice.actions;