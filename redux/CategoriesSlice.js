import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'categories',
  initialState: {
    value: 
      [
        {
          value: 'food',
          label: 'Food',
          icon: 'food-drumstick'
        },
        {
          value: 'water',
          label: 'Water',
          icon: 'cup-water'
        },
        {
          value: 'shelter',
          label: 'Shelter',
          icon: 'tent'
        },
        {
          value: 'clothing',
          label: 'Clothing'
        },
        {
          value: 'cooking',
          label: 'Cooking'
        },
        {
          value: 'survival',
          label: 'Survival'
        },
        {
          value: 'navigation',
          label: 'Navigation'
        },
        {
          value: 'health',
          label: 'Health'
        },
        {
          value: 'misc',
          label: 'Misc'
        },
      ]
    ,
  },
  reducers: {
   
  },
})

// Action creators are generated for each case reducer function
export const { } = counterSlice.actions

export default counterSlice.reducer



