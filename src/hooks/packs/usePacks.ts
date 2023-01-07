import { useNavigation } from "@react-navigation/native";

import { useSelector, useDispatch } from "../../redux/reduxHooks";
import {
  toggleSelectedPack,
  deletePack as deleteAction,
  updatePack as updateAction,
  addPack as addAction
} from "../../redux/packsSlice";
import { confirmDelete } from "../../utils";

interface PackHook {
  packsSlice: PacksSliceState,
  packs: Pack[],
  selectedPack: Pack,
  getPackById(id: string): Pack,
  addPack(pack: PackFormData): void
};

export default function usePacks(): PackHook {
  const packsSlice = useSelector(state => state.packs);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  if (!packsSlice) {
    throw new Error('usePacks must be used within a Redux Provider with a packsReducer in store');
  };

  function createPack(pack: PackData): Pack {
    return {
       // pack properties
       ...pack,
       isSelected: pack.id === packsSlice.selectedPack,
       // base fields is used for distributing only the original field values from store
       baseFields: {
         ...pack
       },
 
       // pack methods
       select() {
         dispatch(toggleSelectedPack({ id: pack.id }));
       },
       openEdit() {
         navigate("EditPack", { pack })
       },
       delete(callback) {
         confirmDelete(
           () => dispatch(deleteAction({ id: pack.id })),
           `Do you want to perminantly delete ${pack.brand} ${pack.model}?`,
           callback
         );
       },
       update(newValues, callback) {
         dispatch(updateAction({ id: pack.id, newValues }));
         if (callback) {
           callback();
         }
       }
    }
  };

  const packs: Pack[] = packsSlice.packs.map(createPack);
  const selectedPack: Pack = packs.find(pack => pack.id === packsSlice.selectedPack);

  function getPackById(id: string): Pack {
    return packs.find(pack => pack.id === id);
  };

  function addPack(pack: PackFormData): void {
    dispatch(addAction({ pack }));
  };

  return { packsSlice, packs, selectedPack, getPackById, addPack };
};