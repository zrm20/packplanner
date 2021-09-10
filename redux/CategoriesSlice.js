import { createSlice } from '@reduxjs/toolkit'

const initialValues = {
        food: {
          label: 'Food',
          icon: 'food-drumstick',
          baseWeightExempt: true,
          stock: true
        },
        water: {
          label: 'Water Containers',
          icon: 'cup-water',
          baseWeightExempt: false,
          holdsLiquid: true,
          stock: true
        },
        fuel: {
          label: 'Fuel',
          icon: 'fuel',
          baseWeightExempt: true,
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

export const counterSlice = createSlice({
  name: 'categories',
  initialState: {
    value: initialValues,
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
    resetToInitialCategories: (state) => {
      state.value = initialValues;
      console.log("CATEGORIES RESET TO INITIAL VALUES");
    }
  },
})

// Action creators are generated for each case reducer function
export const { addCategory, updateCategory, deleteCategory, resetToInitialCategories } = counterSlice.actions

export default counterSlice.reducer



