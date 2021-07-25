import { createSlice } from '@reduxjs/toolkit'
import { inventory } from '../dummyData'

export const counterSlice = createSlice({
  name: 'Inventory',
  initialState: {
    value: inventory,
  },
  reducers: {
    //accepts an object as action payload.
    addItem: (state, action) => {
      const nextId = state.value.length;
      
      state.value.push({
        id: nextId,
        ...action.payload
      })
      console.log('Item Added!')
    },
    toggleInPack: (state, action) => {
      //sets the inPack property on object with a given id. action.payload must contain id
      const id = action.payload;
      let index;

      //first loop through array to find index of the object with the given id
      for(let i = 0; i < state.value.length; i++){
        if(state.value[i].id === id){
          index = i;
          break;
        }
      }
      //now set the object at the determined index to have a inPack property of true
      !state.value[index].inPack ? state.value[index].inPack = true: state.value[index].inPack = false;
      console.log(state.value[index]);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addItem, toggleInPack } = counterSlice.actions

export default counterSlice.reducer