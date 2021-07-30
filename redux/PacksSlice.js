import React from "react";
import { Vibration } from "react-native";
import { createSlice } from '@reduxjs/toolkit'
import { packs } from "../dummyData";
import keygen from "keygenerator";

export const counterSlice = createSlice({
  name: 'packs',
  initialState: {
    value: [{id: 0}],
  },
  reducers: {
    //accepts an object as action payload.
    addPack: (state, action) => {
      //adds new pack to array. action.payload must contain object of pack
      const nextId = keygen._();
      
      state.value.push({
        id: nextId,
        ...action.payload
      })
      Vibration.vibrate(250)
    },
    setActivePack: (state, action) => {
      //this function sets the pack with a given id to have isActivePack property of true, and all other packs to be false

      const id = action.payload;

      for(let i = 0; i < state.value.length; i++){
        if(state.value[i].id === id){
          //ID Found, so do action
          state.value[i].isActivePack = true;
        }else{
          //ID NOT Found so skip
          state.value[i].isActivePack = false;
        }
      }
    },
    replacePack: (state, action) => {
      //this function replaces the pack with a given id with a new object

      const id = action.payload.id;
      console.log(`Submitted edit for pack id ${id}`);
      
      for(let i = 0; i < state.value.length; i++){
        if(state.value[i].id === id){
          //ID FOUND so do action
          state.value[i] = action.payload;
          console.log('Updated pack value...')
          console.log(state.value[i]);
          Vibration.vibrate(100);
          break;
        }
      }
    },
    removePack: (state, action) => {
      //accepts an ID in action.payload and removes object with that ID from state.value array
      const id = action.payload

      for(let i = 0; i < state.value.length; i++){
        if(state.value[i].id === id){
          //ID FOUND so do action
          console.log(`Removing ID: ${id}`);
          console.log(state.value[i]);
          state.value.splice(i, 1);
          console.log('Remaning Packs...');
          console.log(state.value);
          break;
        }
      }
    }
    
  },
});

// Action creators are generated for each case reducer function
export const { addPack, setActivePack, replacePack, removePack } = counterSlice.actions

export default counterSlice.reducer