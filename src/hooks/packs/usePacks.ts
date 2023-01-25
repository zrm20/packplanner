import { useNavigation } from "@react-navigation/native";

import { weightMap } from "../../constants";
import { useSelector, useDispatch } from "../../redux/reduxHooks";
import {
  toggleSelectedPack,
  deletePack as deleteAction,
  updatePack as updateAction,
  addPack as addAction
} from "../../redux/packsSlice";
import { confirmDelete } from "../../utils";
import useSettings from "../settings/useSettings";

interface PackHook {
  packsSlice: PacksSliceState,
  packs: Pack[],
  selectedPack: Pack | null,
  getPackById(id: string): Pack | null,
  addPack(pack: PackFormData): void,
};

export default function usePacks(): PackHook {
  const packsSlice = useSelector(state => state.packs);
  const { weightUnits } = useSettings();
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
        navigate("Locker", { screen: "EditPack", params: { pack: pack.id } })
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
      },
      getWeight() {
        const convertedValue = weightMap[weightUnits].convert(pack.weight);
        return `${convertedValue} ${weightMap[weightUnits].value}`
      }
    }
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