import React from "react";
import { Vibration } from "react-native";
import { createSlice } from '@reduxjs/toolkit';
import keygen from 'keygenerator';
import { inventory } from '../dummyData'


export const counterSlice = createSlice({
  name: 'inventory',
  initialState: {
    value: [],
  },
  reducers: {
    //accepts an object as action payload.
    addItem: (state, action) => {
      const nextId = keygen._();

      state.value.push({
        id: nextId,
        ...action.payload
      })
      Vibration.vibrate(250)
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
    },

    removeItem: (state, action) => {
      //accepts an ID in action.payload and removes object with that ID from state.value array
      const id = action.payload

      for(let i = 0; i < state.value.length; i++){
        if(state.value[i].id === id){
          //ID FOUND so do action
          console.log(`Removing ID: ${id}`);
          console.log(state.value[i]);
          state.value.splice(i, 1);
          console.log('Remaning Inventory...');
          console.log(state.value);
          break;
        }
      }
    },

    replaceItem: (state, action) => {
      //this function replaces the item with a given id with a new object

      const id = action.payload.id;
      console.log(`Submitted edit for item id ${id}`);
      
      for(let i = 0; i < state.value.length; i++){
        if(state.value[i].id === id){
          //ID FOUND so do action
          state.value[i] = action.payload;
          console.log('Updated item value...')
          console.log(state.value[i]);
          Vibration.vibrate(100);
          break;
        }
      }
    },

    emptyPack: (state) => {
      for(let i = 0; i < state.value.length; i++){
        state.value[i].inPack = false;
        state.value[i].qty = 1;
      }

      console.log("Pack Emptied");
    },

    updateQty: (state, action) => {
      const id = action.payload.id;
      const newQty = action.payload.newQty

      console.log(`Submitted qty update for item id ${id}`);

      for(let i = 0; i < state.value.length; i++){
        if(state.value[i].id === id){
          //ID FOUND so do action
          state.value[i].qty  = newQty;
          console.log('Updated item value...')
          console.log(state.value[i].name);
          console.log('Qty: ' + state.value[i].qty)
          break;
        }
      }
    },
    //resets state to an empty array
    resetToInitialState: (state) => {
      state.value = [];
      console.log("Resetting Inventory State...");
    },
    //changes any objects in the array with the given category, to a new category
    batchCategoryChange: (state, action) => {
      const categoryToChange = action.payload.categoryToChange;
      const newCategory = action.payload.newCategory;
      let changeCount = 0;

      console.log(`Changing all items in the ${categoryToChange} category`);

      //loop through the array, find and change any category that matches
      for(let i = 0; i < state.value.length; i++){
        if(state.value[i].category === categoryToChange){
          state.value[i].category = newCategory;
          console.log(`Changing ${state.value[i].name} to ${newCategory}`);
          changeCount++;
        }
      }
      console.log(`Changed ${changeCount} items(s) to ${newCategory}`);
    },
    setToDummyData: (state) => {
      console.log('Resetting inventory to dummy data...')
      state.value = inventory;
    }


  },
})

// Action creators are generated for each case reducer function
export const { addItem, toggleInPack, removeItem, replaceItem, emptyPack, updateQty, resetToInitialState, batchCategoryChange, setToDummyData } = counterSlice.actions

export default counterSlice.reducer