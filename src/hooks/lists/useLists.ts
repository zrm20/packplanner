import { useDispatch, useSelector } from "../../redux/reduxHooks";
import {
  createNewList as createNewListAction
} from "../../redux/listSlice";
import usePacks from "../packs/usePacks";

interface ListHook {
  savePackAsList(listName: string): void;
  logLists(): void;
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

  function logLists() {
    console.log(lists);
  }

  return {
    savePackAsList,
    logLists
  };
};