import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SetAlertPayload = PayloadAction<AlertNotification>;

const initialState: AlertSliceState = {
  alert: null
};

const alertSlice = createSlice(
  {
    name: "alert",
    initialState,
    reducers: {
      setAlert(state, action: SetAlertPayload) {
        state.alert = action.payload;
      },
      clearAlert(state) {
        state.alert = null;
      }
    }
  }
);

export default alertSlice.reducer;

export const { setAlert, clearAlert } = alertSlice.actions;