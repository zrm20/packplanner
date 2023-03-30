import camelize from 'camelize-ts';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect } from 'react';

import { db } from '../../config/firebase';
import { setCategories, setIsLoading as setCategoriesLoading } from '../../redux/categoriesSlice';
import { setInventory, setIsLoading as setInventoryLoading } from '../../redux/inventorySlice';
import { setLists } from '../../redux/listSlice';
import { setPacks, setIsLoading as setPacksLoading } from '../../redux/packsSlice';
import { useDispatch, useSelector } from '../../redux/reduxHooks';
import useThrowAlert from '../alerts/useThrowAlert';

export default function useSubscribeToFirestore() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const packsCollection = collection(db, 'packs');
  const inventoryCollection = collection(db, 'items');
  const categoriesCollection = collection(db, 'categories');
  const listsCollection = collection(db, 'lists');
  const { catchUnknownError } = useThrowAlert();

  // subscribe to packs collection
  useEffect(() => {
    if (user?.uid) {
      dispatch(setPacksLoading(true));
      const packQuery = query(packsCollection, where('uid', '==', user.uid));

      const unsubscribe = onSnapshot(
        packQuery,
        (snapshot) => {
          const packs: PackData[] = [];
          snapshot.forEach((doc) => {
            const pack: PackData = {
              ...(doc.data() as PackDocument),
              id: doc.id,
            };
            packs.push(pack);
          });

          dispatch(setPacks({ packs }));
          dispatch(setPacksLoading(false));
        },
        (err) => {
          catchUnknownError(err, 'Failed to fetch packs');
          dispatch(setPacksLoading(false));
        }
      );

      return unsubscribe;
    }
  }, [user]);

  // subscribe to inventory
  useEffect(() => {
    if (user?.uid) {
      dispatch(setInventoryLoading(true));
      const inventoryQuery = query(inventoryCollection, where('uid', '==', user.uid));

      const unsubscribe = onSnapshot(
        inventoryQuery,
        (snapshot) => {
          const inventory: ItemData[] = [];
          snapshot.forEach((doc) => {
            const item: ItemData = {
              ...(doc.data() as ItemDocument),
              id: doc.id,
            };
            inventory.push(item);
            dispatch(setInventoryLoading(false));
          });

          dispatch(setInventory({ inventory }));
        },
        (err) => {
          catchUnknownError(err, 'Failed to fetch inventory');
          dispatch(setInventoryLoading(false));
        }
      );

      return unsubscribe;
    }
  }, [user]);

  // subscribe to categories
  useEffect(() => {
    if (user?.uid) {
      dispatch(setCategoriesLoading(true));
      const categoriesQuery = query(categoriesCollection, where('uid', '==', user.uid));

      const unsubscribe = onSnapshot(
        categoriesQuery,
        (snapshot) => {
          const categories: CategoryData[] = [];
          snapshot.forEach((doc) => {
            const category: CategoryData = {
              ...(doc.data() as CategoryDocument),
              id: doc.id,
              isStockCategory: false,
              value: camelize<string>(doc.data().label),
            };
            categories.push(category);
          });

          dispatch(setCategories({ categories }));
          dispatch(setCategoriesLoading(false));
        },
        (err) => {
          dispatch(setCategoriesLoading(false));
          catchUnknownError(err, 'Failed to fetch categories');
        }
      );

      return unsubscribe;
    }
  }, [user]);

  // subscribe to lists
  useEffect(() => {
    if (user?.uid) {
      const listsQuery = query(listsCollection, where('uid', '==', user.uid));

      const unsubscribe = onSnapshot(
        listsQuery,
        (snapshot) => {
          const lists: TripListData[] = [];
          snapshot.forEach((doc) => {
            const list: TripListData = {
              ...(doc.data() as TripListDocument),
              id: doc.id,
            };
            lists.push(list);
          });

          dispatch(setLists({ lists }));
        },
        (err) => {
          catchUnknownError(err, 'Failed to fetch lists');
        }
      );

      return unsubscribe;
    }
  }, [user]);
}
