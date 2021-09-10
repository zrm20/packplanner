import { createSlice } from '@reduxjs/toolkit'
import { packs } from '../dummyData'

const initialValues = {
  weightUnits: 'metric',
  liquidCapacityUnits: 'metric',
};

export const counterSlice = createSlice({
  name: 'settings',
  initialState: {
    value: initialValues,
  },
  reducers: {
    setWeightToMetric: (state) => {
      state.value.weightUnits = 'metric'
    },
    setWeightToImperial: (state) => {
      state.value.weightUnits = 'imperial'
    },
    setliquidCapacityToMetric: (state) => {
      state.value.liquidCapacityUnits = 'metric'
    },
    setliquidCapacityToImperial: (state) => {
      state.value.liquidCapacityUnits = 'imperial'
    },
    resetSettingsToInitialValues: (state) => {
      console.log("Resetting settings slice...")
      state.value = initialValues;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setWeightToMetric, setWeightToImperial, setliquidCapacityToMetric, setliquidCapacityToImperial, resetSettingsToInitialValues } = counterSlice.actions

export default counterSlice.reducer