import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import camelize from "camelize-ts";

import { db } from "../../config/firebase";
import { setPacks, setIsLoading as setPacksLoading } from "../../redux/packsSlice";
import { useDispatch, useSelector } from "../../redux/reduxHooks";
import { setInventory } from "../../redux/inventorySlice";
import { setCategories } from "../../redux/categoriesSlice";
import { setLists } from "../../redux/listSlice";
import useThrowAlert from "../alerts/useThrowAlert";

export default function useSubscribeToFirestore() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const packsCollection = collection(db, "packs");
  const inventoryCollection = collection(db, "items");
  const categoriesCollection = collection(db, "categories");
  const listsCollection = collection(db, "lists");
  const { catchUnknownError } = useThrowAlert();

  // subscribe to packs collection
  useEffect(() => {
    if (user?.uid) {
      dispatch(setPacksLoading(true));
      const packQuery = query(packsCollection, where("uid", "==", user.uid));

      const unsubscribe = onSnapshot(
        packQuery,
        (snapshot) => {
          const packs: PackData[] = [];
          snapshot.forEach(doc => {
            const pack: PackData = {
              ...doc.data() as PackDocument,
              id: doc.id
            };
            packs.push(pack);
          });

          dispatch(setPacks({ packs }));
          dispatch(setPacksLoading(false));
        },
        (err) => {
          catchUnknownError(err, "Failed to fetch packs");
          dispatch(setPacksLoading(false));
        }
      );

      return unsubscribe;
    }
  }, [user]);

  // subscribe to inventory
  useEffect(() => {
    if (user?.uid) {
      const inventoryQuery = query(inventoryCollection, where("uid", "==", user.uid));

      const unsubscribe = onSnapshot(
        inventoryQuery,
        (snapshot) => {
          const inventory: ItemData[] = [];
          snapshot.forEach(doc => {
            const item: ItemData = {
              ...doc.data() as ItemDocument,
              id: doc.id
            };
            inventory.push(item);
          });

          dispatch(setInventory({ inventory }))
        },
        (err) => {
          catchUnknownError(err, "Failed to fetch inventory")
        }
      );

      return unsubscribe;
    }
  }, [user]);

  // subscribe to categories
  useEffect(() => {
    if (user?.uid) {
      const categoriesQuery = query(categoriesCollection, where("uid", "==", user.uid));

      const unsubscribe = onSnapshot(
        categoriesQuery,
        (snapshot) => {
          const categories: CategoryData[] = [];
          snapshot.forEach(doc => {
            const category: CategoryData = {
              ...doc.data() as CategoryDocument,
              id: doc.id,
              isStockCategory: false,
              value: camelize<string>(doc.data().label)
            };
            categories.push(category);
          });

          dispatch(setCategories({ categories }))
        },
        (err) => {
          catchUnknownError(err, "Failed to fetch categories")
        }
      );

      return unsubscribe;
    }
  }, [user]);

  // subscribe to lists
  useEffect(() => {
    if (user?.uid) {
      const listsQuery = query(listsCollection, where("uid", "==", user.uid));

      const unsubscribe = onSnapshot(
        listsQuery,
        (snapshot) => {
          const lists: TripListData[] = [];
          snapshot.forEach(doc => {
            const list: TripListData = {
              ...doc.data() as TripListDocument,
              id: doc.id,
            };
            lists.push(list);
          });

          dispatch(setLists({ lists }))
        },
        (err) => {
          catchUnknownError(err, "Failed to fetch lists")
        }
      );

      return unsubscribe;
    }
  }, [user]);

};