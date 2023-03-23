import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SetSelectedPackPayload = PayloadAction<{ packId: string | null }>;
type AddToPackPayload = PayloadAction<{ itemId: string, qty?: number }>;
type SetItemQtyPayload = PayloadAction<{ itemId: string, qty: number }>;
type ToggleIsPackedPayload = PayloadAction<{ itemId: string }>;
type RemoveFromPackPayload = PayloadAction<{ itemId: string }>;

const initialState: MyPackSliceState = {
  selectedPack: null,
  itemsInPack: []
};

const myPackSlice = createSlice(
  {
    name: "myPack",
    initialState,
    reducers: {
      setSelectedPack(state, action: SetSelectedPackPayload) {
        if (state.selectedPack === action.payload.packId) {
          state.selectedPack = null;
        } else {
          state.selectedPack = action.payload.packId
        }
      },
      addToPack(state, action: AddToPackPayload) {
        const { itemId, qty = 1 } = action.payload;

        state.itemsInPack.push({ id: itemId, qty, isPacked: false })
      },
      removeFromPack(state, action: RemoveFromPackPayload) {
        const { itemId } = action.payload;

        state.itemsInPack = state.itemsInPack.filter(item => item.id !== itemId);
      },
      setItemQty(state, action: SetItemQtyPayload) {
        const { itemId, qty } = action.payload;

        const indexToUpdate = state.itemsInPack.findIndex(item => item.id === itemId);

        if (indexToUpdate === -1) {
          throw new Error("Item with that ID could not be found");
        };

        if (qty <= 0) {
          // if qty is 0 or negative, item should be removed from array
          state.itemsInPack = state.itemsInPack.filter(item => item.id !== itemId);
        } else {
          state.itemsInPack[indexToUpdate].qty = qty
        };
      },
      toggleIsPacked(state, action: ToggleIsPackedPayload) {
        const { itemId } = action.payload;

        const indexToUpdate = state.itemsInPack.findIndex(item => item.id === itemId);

        if (indexToUpdate === -1) {
          throw new Error("Item with that ID could not be found");
        };

        state.itemsInPack[indexToUpdate].isPacked = !state.itemsInPack[indexToUpdate].isPacked;
      },
      emptyPack(state) {
        state.itemsInPack = [];
      },
      clearMyPack(state) {
        console.log('Clearing')
        AsyncStorage.clear();
        state.itemsInPack = [];
        state.selectedPack = null;
      }
    }
  }
);

export default myPackSlice.reducer;

export const {
  setSelectedPack,
  addToPack,
  setItemQty,
  toggleIsPacked,
  emptyPack,
  removeFromPack,
  clearMyPack
} = myPackSlice.actions;