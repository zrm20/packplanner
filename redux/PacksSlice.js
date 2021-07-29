import { createSlice } from '@reduxjs/toolkit'
import { packs } from '../dummyData'



export const counterSlice = createSlice({
  name: 'packs',
  initialState: {
    value: [{id: 0}],
  },
  reducers: {
    //accepts an object as action payload.
    addPack: (state, action) => {
      //adds new pack to array. action.payload must contain object of pack
      const nextId = state.value.length;
      
      state.value.push({
        id: nextId,
        ...action.payload
      })
      console.log(action.payload);
      console.log(state.value);
    },
    setActivePack: (state, action) => {
      //this function sets the pack with a given id to have isActivePack property of true, and all other packs to be false

      const id = action.payload;

      for(let i = 0; i < state.value.length; i++){
        if(state.value[i].id === id){
          state.value[i].isActivePack = true;
        }else{
          state.value[i].isActivePack = false;
        }
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addPack, setActivePack } = counterSlice.actions

export default counterSlice.reducer