import { useSelector } from "../../redux/reduxHooks";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

interface PackHook {
  packs: PackData[],
  selectedPack: PackData | null,
  getPackById(id: string): PackData | null,
  addPack(pack: PackFormData): Promise<void>,
};

export default function usePacks(): PackHook {
  const packs = useSelector(state => state.packs.packs);
  const selectedPackId = useSelector(state => state.myPack.selectedPack)
  const user = useSelector(state => state.user.user);
  const packsCollection = collection(db, "packs");


  const selectedPack = packs.find(pack => pack.id === selectedPackId) || null;

  function getPackById(id: string): PackData | null {
    return packs.find(pack => pack.id === id) || null;
  };

  async function addPack(pack: PackFormData): Promise<void> {
    const newPackDoc: PackDocument = {
      ...pack,
      uid: user!.uid
    };
    await addDoc(packsCollection, newPackDoc);
  };

  return { packs, selectedPack, getPackById, addPack };
};