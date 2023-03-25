import { useDispatch, useSelector } from "../../redux/reduxHooks";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { loadFromList } from "../../redux/myPackSlice";
import { confirmDelete } from "../../utils";

interface ListHook {
  savePackAsList(listName: string): Promise<void>;
  loadList(list: TripListData): void;
  deleteList(listId: string, callbackFn?: () => void): void;
  lists: TripListData[];
};

export default function useLists(): ListHook {
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

  async function deleteList(listId: string): Promise<void> {
    const listRef = doc(listsCollection, listId);

    await confirmDelete(
      async () => await deleteDoc(listRef),
      "Do you want to permanently delete this list?",
    )
  };

  return {
    lists,
    savePackAsList,
    loadList,
    deleteList
  };
};