import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SetListsPayload = PayloadAction<{ lists: TripListData[] }>;

const initialState: ListSliceState = {
  lists: [],
};

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setLists(state, action: SetListsPayload) {
      state.lists = action.payload.lists;
    },
  },
});

export default listSlice.reducer;
export const { setLists } = listSlice.actions;
