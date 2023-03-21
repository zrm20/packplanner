import { useSelector, useDispatch } from "../../redux/reduxHooks";
import { toggleSelectedPack } from "../../redux/packsSlice";
import { confirmDelete } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import useSettings from "../settings/useSettings";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

/*
  This hook returns a function used to construct a complex Pack object
  from PackData stored in redux (which is only serializable data), and 
  returns a Pack object. The Pack created has methods and properties 
  attached to it.
*/

export default function useCreatePack() {
  const packsSlice = useSelector(state => state.packs);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { weightUnit } = useSettings();

  async function deletePack(id: string): Promise<void> {
    await deleteDoc(doc(db, "packs", id));
  };

  async function updatePack(id: string, newValues: PackFormData): Promise<void> {
    const docRef = doc(db, "packs", id);

    await setDoc(docRef, newValues, { merge: true });
  };

  function constructPack(pack: PackData): Pack {
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
          () => deletePack(pack.id),
          `Do you want to permanently delete ${pack.brand} ${pack.model}?`,
          callback
        )
      },
      async update(newValues, callback) {
        await updatePack(pack.id, newValues);
        if (callback) {
          callback();
        }
      },
      getWeight() {
        const convertedValue = weightUnit.convert(pack.weight);
        return `${convertedValue} ${weightUnit.label}`
      }
    }
  };

  return constructPack;
};