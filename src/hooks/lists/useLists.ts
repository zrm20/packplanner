import { useDispatch, useSelector } from "../../redux/reduxHooks";
import { createNewList as createNewListAction } from "../../redux/listSlice";
import { overWriteWithList } from "../../redux/inventorySlice";
import { setSelectedPack } from "../../redux/packsSlice";

interface ListHook {
  savePackAsList(listName: string): void;
  loadList(list: TripListData): void;
  lists: TripListData[];
};

export default function useLists(): ListHook {
  const dispatch = useDispatch();
  const { lists } = useSelector(state => state.lists);
  const { inventory } = useSelector(state => state.inventory);
  const { packs, selectedPack } = useSelector(state => state.packs);

  function savePackAsList(listName: string): void {
    const itemsInPack = inventory.filter(item => item.inPack);
    const pack = packs.find(p => p.id === selectedPack) || null;

    const newList: TripListFormData = {
      name: listName,
      pack,
      items: itemsInPack
    };

    dispatch(createNewListAction({ list: newList }));
  };

  function loadList(list: TripListData): void {
    dispatch(overWriteWithList({ list }));
    dispatch(setSelectedPack({ id: list.pack?.id || null }));
  };

  return {
    savePackAsList,
    loadList,
    lists
  };
};