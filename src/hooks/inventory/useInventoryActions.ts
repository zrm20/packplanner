import { addDoc, collection } from "firebase/firestore";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { confirmDelete } from "../../utils";
import { db } from "../../config/firebase";
import { useSelector } from "../../redux/reduxHooks";
import {
  emptyPack as emptyPackAction
} from "../../redux/myPackSlice";

export default function useInventoryActions() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const itemsCollection = collection(db, "items");

  const addToInventory = useCallback(
    async function (newItem: ItemFormData): Promise<void> {
      const newItemDoc: ItemDocument = {
        ...newItem,
        uid: user!.uid
      }
      await addDoc(itemsCollection, newItemDoc)
    },
    [user]);


  function emptyPack(): void {
    confirmDelete(
      () => dispatch(emptyPackAction()),
      "Are you sure you want to remove all items from your pack?"
    )
  };

  return {
    addToInventory,
    emptyPack
  }
};