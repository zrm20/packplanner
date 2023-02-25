import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserSliceState = {
  user: null,
  isLoading: false,
  error: null
};

const userSlice = createSlice(
  {
    name: 'user',
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<{ user: User }>) => {
        state.user = action.payload.user;
      },
      clearUser: (state) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
      }
    }
  }
);

export default userSlice.reducer;

export const {
  setUser,
  clearUser
} = userSlice.actions;