import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'categories',
  initialState: {
    value: 
      {
        food: {
          label: 'Food',
          icon: 'food-drumstick',
          baseWeightExempt: true,
          stock: true
        },
        water: {
          label: 'Water',
          icon: 'cup-water',
          baseWeightExempt: true,
          stock: true
        },
        fuel: {
          label: 'Fuel',
          icon: 'fuel',
          stock: true
        },
        shelter: {
          label: 'Shelter',
          icon: 'tent',
          stock: true
        },
        clothing: {
          label: 'Clothing',
          icon: 'tshirt-crew',
          stock: true
        },
        cooking: {
          label: 'Cooking',
          icon: 'grill',
          stock: true
        },
        survival: {
          label: 'Survival',
          icon: 'knife-military',
          stock: true
        },
        navigation: {
          label: 'Navigation',
          icon: 'map',
          stock: true
        },
        health: {
          label: 'Health',
          icon: 'medical-bag',
          stock: true
        },
        electronics: {
          label: 'Electronics',
          icon: 'battery-charging-100',
          stock: true
        },
        misc: {
          label: 'Misc',
          icon: 'chart-bubble',
          stock: true
        },
      }
    ,
  },
  reducers: {
   
  },
})

// Action creators are generated for each case reducer function
export const { } = counterSlice.actions

export default counterSlice.reducer



