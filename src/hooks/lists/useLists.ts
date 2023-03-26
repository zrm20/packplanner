import { useDispatch, useSelector } from "../../redux/reduxHooks";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { loadFromList } from "../../redux/myPackSlice";

export default function useLists() {
  const lists = useSelector(state => state.lists.lists);
  const myPackState = useSelector(state => state.myPack);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const listsCollection = collection(db, "lists");

  async function savePackAsList(listName: string): Promise<void> {
    const newDoc: TripListDocument = {
      name: listName,
      uid: user!.uid,
      myPackState
    };

    await addDoc(listsCollection, newDoc);
  };

  function loadList(list: TripListData): void {
    dispatch(loadFromList({ list }))
  };

  function deleteList(listId: string): Promise<void> {
    const listRef = doc(listsCollection, listId);

    return deleteDoc(listRef);
  };

  return {
    lists,
    savePackAsList,
    loadList,
    deleteList
  };
};