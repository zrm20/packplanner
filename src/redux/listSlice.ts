import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from 'react-native-uuid';

type CreateNewListPayload = PayloadAction<{ list: TripListFormData }>;
type UpdateListPayload = PayloadAction<{ listId: string, newList: TripListFormData }>;
type DeleteListPayload = PayloadAction<{ listId: string }>;

const initialState: ListSliceState = {
  lists: []
};

const listSlice = createSlice(
  {
    name: 'lists',
    initialState,
    reducers: {
      createNewList: (state, action: CreateNewListPayload) => {
        const newList: TripListData = {
          id: uuid.v4() as string,
          ...action.payload.list
        };

        state.lists.push(newList);
      },
      updateList: (state, action: UpdateListPayload) => {
        const { listId, newList } = action.payload;

        const indexToUpdate = state.lists.findIndex(list => list.id === listId);

        if (indexToUpdate === -1) {
          throw new Error(`No list with id ${listId} found.`);
        };

        state.lists[indexToUpdate] = {
          ...newList,
          id: state.lists[indexToUpdate].id
        };
      },
      deleteList: (state, action: DeleteListPayload) => {
        const { listId } = action.payload;

        const indextoDelete = state.lists.findIndex(list => list.id === listId);

        if (indextoDelete === -1) {
          throw new Error(`No list with id ${listId} found.`);
        };

        state.lists = state.lists.filter(list => list.id !== listId);
      }
    }
  }
);

export default listSlice.reducer;
export const { createNewList, updateList, deleteList } = listSlice.actions;