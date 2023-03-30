import { useNavigation } from '@react-navigation/native';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useMemo } from 'react';

import { db } from '../../config/firebase';
import {
  setItemQty,
  toggleIsPacked as toggleIsPackedAction,
  addToPack as addToPackAction,
  removeFromPack as removeFromPackAction,
} from '../../redux/myPackSlice';
import { useDispatch, useSelector } from '../../redux/reduxHooks';
import { confirmDelete } from '../../utils';
import useSettings from '../settings/useSettings';

export default function useItemModel(item: Item): ItemModel {
  const myPackItems = useSelector((state) => state.myPack.itemsInPack);
  const category = useSelector((state) =>
    state.categories.categories.find((c) => c.id === item.category)
  );
  const miscCategory = useSelector((state) =>
    state.categories.categories.find((c) => c.id === '00')
  )!;
  const { weightUnit, liquidUnit } = useSettings();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const docRef = doc(db, 'items', item.id);
  const packedItem = myPackItems.find((packedItem) => packedItem.id === item.id);

  const itemModel: ItemModel = useMemo(
    () => ({
      // item properties
      ...item,

      // populate the category field
      category: category ? category : miscCategory, // defaults back to Misc category if no category found

      // item methods
      openEdit() {
        navigate('Locker', { screen: 'EditItem', params: { item } });
      },
      update(newValues: ItemFormData): Promise<void> {
        return updateDoc(docRef, { ...newValues });
      },
      async delete(): Promise<void> {
        await deleteDoc(docRef);
        dispatch(removeFromPackAction({ itemId: item.id }));
      },
      addToPack() {
        dispatch(addToPackAction({ itemId: item.id }));
      },
      setQty(newQty: number) {
        dispatch(setItemQty({ itemId: item.id, qty: newQty }));
      },
      getWeight() {
        const convertedWeight = weightUnit.convert(item.weight);
        return `${convertedWeight} ${weightUnit.label}`;
      },
      getLiquidCapacity() {
        if (!item.liquidCapacity) {
          return '';
        }
        const convertedCapacity = liquidUnit.convert(item.liquidCapacity);
        return `${convertedCapacity} ${liquidUnit.label}`;
      },
      toggleIsPacked() {
        dispatch(toggleIsPackedAction({ itemId: item.id }));
      },
    }),
    [item, myPackItems, category, weightUnit, liquidUnit]
  );

  return itemModel;
}
