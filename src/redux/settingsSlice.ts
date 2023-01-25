import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SettingsSliceState = {
  weightUnits: 'kg',
  liquidUnits: 'ml'
};

const settingsSlice = createSlice(
  {
    name: 'settings',
    initialState,
    reducers: {
      changeWeightUnits: (state, action: PayloadAction<{ newUnit: WeightUnit }>) => {
        const { newUnit } = action.payload;

        if (!newUnit) {
          throw new Error('No newUnit recieved');
        };

        state.weightUnits = newUnit;
      },
      changeLiquidUnits: (state, action: PayloadAction<{ newUnit: LiquidCapacityUnit }>) => {
        const { newUnit } = action.payload;

        if (!newUnit) {
          throw new Error('No newUnit recieved');
        };

        state.liquidUnits = newUnit;
      }
    }
  }
);

export default settingsSlice.reducer;

export const { changeLiquidUnits, changeWeightUnits } = settingsSlice.actions;