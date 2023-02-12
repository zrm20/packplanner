import { useSelector, useDispatch } from "../../redux/reduxHooks";
import {
  addPack as addAction
} from "../../redux/packsSlice";
import useCreatePack from "./useCreatePack";

interface PackHook {
  packsSlice: PacksSliceState,
  packs: Pack[],
  selectedPack: Pack | null,
  getPackById(id: string): Pack | null,
  addPack(pack: PackFormData): void,
};

export default function usePacks(): PackHook {
  const packsSlice = useSelector(state => state.packs);
  const dispatch = useDispatch();
  const createPack = useCreatePack();

  if (!packsSlice) {
    throw new Error('usePacks must be used within a Redux Provider with a packsReducer in store');
  };

  const packs: Pack[] = packsSlice.packs.map(createPack);
  const selectedPack = packs.find(pack => pack.id === packsSlice.selectedPack) || null;

  function getPackById(id: string): Pack | null {
    return packs.find(pack => pack.id === id) || null;
  };

  function addPack(pack: PackFormData): void {
    dispatch(addAction({ pack }));
  };

  return { packsSlice, packs, selectedPack, getPackById, addPack };
};