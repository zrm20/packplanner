import { useDispatch, useSelector } from "../../redux/reduxHooks";
import { confirmDelete } from "../../utils";
import {
  createNewList as createNewListAction,
  deleteList as deleteListAction
} from "../../redux/listSlice";

interface ListHook {
  savePackAsList(listName: string): void;
  loadList(list: TripListData): void;
  deleteList(listId: string, callbackFn?: () => void): void;
  lists: TripListData[];
};

export default function useLists(): ListHook {
  const dispatch = useDispatch();
  const { lists } = useSelector(state => state.lists);
  const { inventory } = useSelector(state => state.inventory);
  const packs = useSelector(state => state.packs.packs);
  const selectedPack = useSelector(state => state.myPack.selectedPack)

  function savePackAsList(listName: string): void {
    // const itemsInPack = inventory.filter(item => item.qty > 0);
    // const pack = packs.find(p => p.id === selectedPack) || null;

    // const newList: TripListFormData = {
    //   name: listName,
    //   pack,
    //   items: itemsInPack
    // };

    // dispatch(createNewListAction({ list: newList }));
  };

  function loadList(list: TripListData): void {
    // dispatch(overWriteWithList({ list }));
    // dispatch(setSelectedPack({ id: list.pack?.id || null }));
  };

  function deleteList(listId: string, callbackFn?: () => void): void {
    confirmDelete(
      () => dispatch(deleteListAction({ listId })),
      "Do you want to permanently delete this list?",
      callbackFn
    );
  };

  return {
    savePackAsList,
    loadList,
    deleteList,
    lists
  };
};