import { useSelector, useDispatch } from "../../redux/reduxHooks";
import useCreatePack from "./useCreatePack";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Alert } from "react-native";

interface PackHook {
  packsSlice: PacksSliceState,
  packs: Pack[],
  selectedPack: Pack | null,
  getPackById(id: string): Pack | null,
  addPack(pack: PackFormData): void,
};

export default function usePacks(): PackHook {
  const packsSlice = useSelector(state => state.packs);
  const user = useSelector(state => state.user.user)
  const createPack = useCreatePack();
  const packsCollection = collection(db, "packs");

  if (!packsSlice) {
    throw new Error('usePacks must be used within a Redux Provider with a packsReducer in store');
  };

  const packs: Pack[] = packsSlice.packs.map(createPack);
  const selectedPack = packs.find(pack => pack.id === packsSlice.selectedPack) || null;

  function getPackById(id: string): Pack | null {
    return packs.find(pack => pack.id === id) || null;
  };

  async function addPack(pack: PackFormData): Promise<void> {
    const newPackDoc: PackDocument = {
      ...pack,
      uid: user!.uid
    };
    try {
      await addDoc(packsCollection, newPackDoc);
    } catch (err) {
      Alert.alert("Error", "See console"); // TODO Improve error
      console.log(err)
    };
  };

  return { packsSlice, packs, selectedPack, getPackById, addPack };
};