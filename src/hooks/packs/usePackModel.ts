import { useNavigation } from '@react-navigation/native';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useMemo } from 'react';

import { db } from '../../config/firebase';
import { setSelectedPack } from '../../redux/myPackSlice';
import { useSelector, useDispatch } from '../../redux/reduxHooks';
import useSettings from '../settings/useSettings';

export default function usePackModel(pack: PackData): PackModel {
  const selectedPackId = useSelector((state) => state.myPack.selectedPack);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { weightUnit } = useSettings();

  const docRef = doc(db, 'packs', pack.id);

  async function deletePack(id: string): Promise<void> {
    await deleteDoc(doc(db, 'packs', id));
  }

  const packModel: PackModel = useMemo(
    () => ({
      // pack properties
      ...pack,

      // pack methods
      select(): void {
        dispatch(setSelectedPack({ packId: pack.id }));
      },
      openEdit(): void {
        navigate('Locker', { screen: 'EditPack', params: { pack } });
      },
      async delete(): Promise<void> {
        await deletePack(pack.id);
        if (pack.id === selectedPackId) {
          dispatch(setSelectedPack({ packId: null }));
        }
      },
      update(newValues: PackFormData): Promise<void> {
        return setDoc(docRef, newValues, { merge: true });
      },
      getWeight(): string {
        const convertedValue = weightUnit.convert(pack.weight);
        return `${convertedValue} ${weightUnit.label}`;
      },
    }),
    [pack, selectedPackId]
  );

  return packModel;
}
