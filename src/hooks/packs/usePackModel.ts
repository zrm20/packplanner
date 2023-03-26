import { useMemo } from "react";

import { useSelector, useDispatch } from "../../redux/reduxHooks";
import { confirmDelete } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import useSettings from "../settings/useSettings";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { setSelectedPack } from "../../redux/myPackSlice";

export default function usePackModel(pack: PackData): PackModel {
  const selectedPackId = useSelector(state => state.myPack.selectedPack);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { weightUnit } = useSettings();

  const docRef = doc(db, "packs", pack.id);

  async function deletePack(id: string): Promise<void> {
    await deleteDoc(doc(db, "packs", id));
  };

  const packModel: PackModel = useMemo(() => ({
    // pack properties
    ...pack,

    // pack methods
    select() {
      dispatch(setSelectedPack({ packId: pack.id }));
    },
    openEdit() {
      navigate("Locker", { screen: "EditPack", params: { pack: pack } })
    },
    delete(callback?) {
      confirmDelete(
        async () => {
          await deletePack(pack.id);
          if (pack.id === selectedPackId) {
            dispatch(setSelectedPack({ packId: null }))
          }
        },
        `Do you want to permanently delete ${pack.brand} ${pack.model}?`,
        callback
      )
    },
    update(newValues: PackFormData): Promise<void> {
      return setDoc(docRef, newValues, { merge: true });
    },
    getWeight() {
      const convertedValue = weightUnit.convert(pack.weight);
      return `${convertedValue} ${weightUnit.label}`
    }
  }), [pack, selectedPackId]);

  return packModel;
};