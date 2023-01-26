import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import camelize from 'camelize-ts';
import uuid from 'react-native-uuid';

import { stockCategories } from "../constants";

const initialState: CategorySliceState = {
  categories: stockCategories
};

const categoiesSlice = createSlice(
  {
    name: 'categories',
    initialState,
    reducers: {
      addCategory: (state, action: PayloadAction<{ newCategory: CategoryFormData }>) => {
        const { newCategory } = action.payload;

        if (!newCategory) {
          throw new Error('No newCategory recieved');
        };

        const categoryWithSameName = state.categories.find(category => category.label === newCategory.label);

        if (categoryWithSameName) {
          throw new Error(`A category with the name ${newCategory.label} already exists`);
        };

        const newCategoryData: CategoryData = {
          ...newCategory,
          value: camelize(newCategory.label),
          id: uuid.v4() as string
        };

        state.categories.push(newCategoryData);
      },
      removeCategory: (state, action: PayloadAction<{ id: string }>) => {
        const { id } = action.payload;

        if (!id) {
          throw new Error('No category id recieved');
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
          ...newValues,
          value: camelize(newValues.label),
          // ensure that original id is not changed
          id: state.categories[indexToUpdate].id
        };

        state.categories[indexToUpdate] = newCategoryData;
      }
    }
  }
);

export default categoiesSlice.reducer;
export const { addCategory, removeCategory, updateCategory } = categoiesSlice.actions;