import { createSlice } from '@reduxjs/toolkit'
import { packs } from '../dummyData'

export const counterSlice = createSlice({
  name: 'settings',
  initialState: {
    value: {
      weightUnits: 'metric',
      waterCapacityUnits: 'metric',
    },
  },
  reducers: {
    setWeightToMetric: (state) => {
      state.value.weightUnits = 'metric'
    },
    setWeightToImperial: (state) => {
      state.value.weightUnits = 'imperial'
    },
    setWaterCapacityToMetric: (state) => {
      state.value.waterCapacityUnits = 'metric'
    },
    setWaterCapacityToImperial: (state) => {
      state.value.waterCapacityUnits = 'imperial'
    },
  },
})

// Action creators are generated for each case reducer function
export const {  } = counterSlice.actions

export default counterSlice.reducer