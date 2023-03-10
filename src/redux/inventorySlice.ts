import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

type OverWriteWithListPayload = PayloadAction<{ list: TripListData }>

const initialState: InventorySliceState = { inventory: [] };

const inventorySlice = createSlice(
  {
    name: 'inventory',
    initialState,
    reducers: {
      addItem: (state, action: PayloadAction<{ item: ItemFormData }>) => {
        const { item } = action.payload;

        if (!item) {
          throw new Error("No item recieved");
        };

        const newItem: ItemData = {
          ...item,
          id: uuid.v4() as string,
          qty: 1,
          isPacked: false
        };

        state.inventory.push(newItem);
      },
      deleteItem: (state, action: PayloadAction<{ id: string }>) => {
        const { id } = action.payload;

        if (!id) {
          throw new Error("No item id recieved");
        };

        state.inventory = state.inventory.filter(item => item.id !== id);
      },
      updateItem: (state, action: PayloadAction<{ id: string, newValues: ItemFormData }>) => {
        const { id, newValues } = action.payload;

        if (!id) {
          throw new Error("No item id recieved");
        };

        if (!newValues) {
          throw new Error("newValues were not recieved");
        };

        const indexToUpdate = state.inventory.findIndex(item => item.id === id);

        if (indexToUpdate === -1) {
          throw new Error("Item with that ID was not found");
        };

        state.inventory[indexToUpdate] = {
          ...state.inventory[indexToUpdate],
          ...newValues,
          // ensure that id is unchanged
          id: state.inventory[indexToUpdate].id
        };
      },
      toggleInPack: (state, action: PayloadAction<{ id: string }>) => {
        const { id } = action.payload;

        if (!id) {
          throw new Error("No item id recieved");
        };

        const indexToUpdate = state.inventory.findIndex(item => item.id === id);

        if (indexToUpdate === -1) {
          throw new Error("Item with that ID was not found");
        };


        if (state.inventory[indexToUpdate].inPack) {
          // if removing from pack, reset the qty to 1
          state.inventory[indexToUpdate].inPack = false;
          state.inventory[indexToUpdate].qty = 1;
          state.inventory[indexToUpdate].isPacked = false;
        } else {
          state.inventory[indexToUpdate].inPack = true;
        };
      },
      updateQty: (state, action: PayloadAction<{ id: string, newQty: number }>) => {
        const { id, newQty } = action.payload;

        if (!id) {
          throw new Error("No item id recieved");
        };

        if (!newQty) {
          throw new Error("newValues were not recieved");
        };

        const newInt = Math.floor(newQty);

        if (newInt < 1) {
          throw new Error("newQty must be greater than or equal to 1");
        };

        const indexToUpdate = state.inventory.findIndex(item => item.id === id);

        if (indexToUpdate === -1) {
          throw new Error("Item with that ID was not found");
        };

        state.inventory[indexToUpdate] = {
          ...state.inventory[indexToUpdate],
          qty: newInt
        };
      },
      toggleIsPacked: (state, action: PayloadAction<{ id: string }>) => {
        const { id } = action.payload;

        if (!id) {
          throw new Error("No item id recieved");
        };

        const indexToUpdate = state.inventory.findIndex(item => item.id === id);

        if (indexToUpdate === -1) {
          throw new Error("Item with that ID was not found");
        };

        state.inventory[indexToUpdate].isPacked = !state.inventory[indexToUpdate].isPacked;
      },
      emptyPack: (state, action: PayloadAction<undefined>) => {
        state.inventory.forEach(item => {
          item.inPack = false;
          item.isPacked = false;
          item.qty = 1;
        })
      },
      updateItemsCategory: (state, action: PayloadAction<{ categoryId: string, newCategoryId?: string }>) => {
        const { categoryId, newCategoryId = '00' } = action.payload;

        if (!categoryId) {
          throw new Error('No Category Id recieved')
        };

        let updateCount = 0;

        state.inventory.forEach(item => {
          if (item.category === categoryId) {
            item.category = newCategoryId;
            updateCount++;
          };
        });
      },
      overWriteWithList: (state, action: OverWriteWithListPayload) => {
        const { items } = action.payload.list;

        // empty pack, resetting the inPack, isPacked and qty
        state.inventory.forEach(item => {
          item.inPack = false;
          item.isPacked = false;
          item.qty = 1;
        });


        items.forEach(item => {
          const indexToUpdate = state.inventory.findIndex(i => i.id === item.id);

          if (indexToUpdate === -1) {
            return;
          };

          state.inventory[indexToUpdate].inPack = item.inPack
          state.inventory[indexToUpdate].qty = item.qty
        });
      }
    }
  }
);

export default inventorySlice.reducer;

export const {
  addItem,
  deleteItem,
  updateItem,
  toggleInPack,
  updateQty,
  toggleIsPacked,
  emptyPack,
  updateItemsCategory,
  overWriteWithList
} = inventorySlice.actions;
