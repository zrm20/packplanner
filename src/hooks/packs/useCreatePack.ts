import { useSelector, useDispatch } from "../../redux/reduxHooks";
import { confirmDelete } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import useSettings from "../settings/useSettings";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { setSelectedPack } from "../../redux/myPackSlice";

/*
  This hook returns a function used to construct a complex Pack object
  from PackData stored in redux (which is only serializable data), and 
  returns a Pack object. The Pack created has methods and properties 
  attached to it.
*/

export default function useCreatePack() {
  const selectedPackId = useSelector(state => state.myPack.selectedPack);
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
      isSelected: pack.id === selectedPackId,
      // base fields is used for distributing only the original field values from store
      baseFields: {
        ...pack
      },

      // pack methods
      select() {
        dispatch(setSelectedPack({ packId: pack.id }));
      },
      openEdit() {
        navigate("Locker", { screen: "EditPack", params: { pack: pack.id } })
      },
      async delete() {
        await confirmDelete(
          async () => {
            await deletePack(pack.id);
            if (pack.id === selectedPackId) {
              dispatch(setSelectedPack({ packId: null }))
            }
          },
          `Do you want to permanently delete ${pack.brand} ${pack.model}?`,
        )
      },
      async update(newValues) {
        await updatePack(pack.id, newValues);
      },
      getWeight() {
        const convertedValue = weightUnit.convert(pack.weight);
        return `${convertedValue} ${weightUnit.label}`
      }
    }
  };

  return constructPack;
};