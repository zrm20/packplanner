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
          baseWeightExempt: false,
          holdsWater: true,
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
    addCategory: (state, action) => {
      //recieves a key string, and an object for a new category
      const key = action.payload.key;
      const newCategory = action.payload.newCategory;

      console.log(`Adding ${key} with value...`)
      console.log(newCategory)

      state.value[key] = newCategory;

      console.log('<----------CATEGORIES--------->')
      console.log(state.value);
      console.log('<------END CATEGORIES--------->')
    },
    deleteCategory: (state, action) => {
      //recieves a key to determine which category to delete.
      const key = action.payload;

      console.log(`Deleting ${key} from Categories`);

      delete state.value[key];

      console.log('<----------CATEGORIES--------->')
      console.log(state.value);
      console.log('<------END CATEGORIES--------->')
    },
    resetToInitialState: (state) => {
      state.value = initialState;
      console.log("CATEGORIES RESET TO INITIAL STATE");
    }
  },
})

// Action creators are generated for each case reducer function
export const { addCategory, updateCategory, deleteCategory, resetToInitialState } = counterSlice.actions

export default counterSlice.reducer



