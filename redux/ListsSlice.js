import { createSlice } from "@reduxjs/toolkit";
import keygen from 'keygenerator';

export const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    value: []
  },
  reducers: {
    saveList: (state, action) => {
      //save a list object to the lists array
      const newList = action.payload;
      newList.id = keygen._();
      
      console.log(`Saving new list ${newList.name} with id: ${newList.id}`);
      console.log(newList);

      state.value.push(newList);
    },
    logLists: (state) => {
      console.log("--LISTS-----");
      console.log(state.value);
      console.log("--END LISTS-----")
    },
    removeAllLists: (state) => {
      console.log("Removing all lists");
      state.value = [];
    },
    deleteList: (state, action) => {
      const id = action.payload;

      const index = state.value.findIndex(list => list.id === id);

      state.value.splice(index);
      console.log(`List ${id} removed`);
    }
  }
});

export const { saveList, logLists, removeAllLists, deleteList } = listsSlice.actions;

export default listsSlice.reducer;