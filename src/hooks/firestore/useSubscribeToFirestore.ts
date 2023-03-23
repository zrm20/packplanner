import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import camelize from "camelize-ts";

import { db } from "../../config/firebase";
import { setPacks } from "../../redux/packsSlice";
import { useDispatch, useSelector } from "../../redux/reduxHooks";
import { setInventory } from "../../redux/inventorySlice";
import { setCategories } from "../../redux/categoriesSlice";

export default function useSubscribeToFirestore() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const packsCollection = collection(db, "packs");
  const inventoryCollection = collection(db, "items");
  const categoriesCollection = collection(db, "categories");

  // subscribe to packs collection
  useEffect(() => {
    if (user?.uid) {
      const packQuery = query(packsCollection, where("uid", "==", user.uid));

      const unsubscribe = onSnapshot(packQuery, (snapshot) => {
        const packs: PackData[] = [];
        snapshot.forEach(doc => {
          const pack: PackData = {
            ...doc.data() as PackDocument,
            id: doc.id
          };
          packs.push(pack);
        });

        dispatch(setPacks({ packs }))
      });

      return unsubscribe;
    }
  }, [user]);

  // subscribe to inventory
  useEffect(() => {
    if (user?.uid) {
      const inventoryQuery = query(inventoryCollection, where("uid", "==", user.uid));

      const unsubscribe = onSnapshot(inventoryQuery, (snapshot) => {
        const inventory: ItemData[] = [];
        snapshot.forEach(doc => {
          const item: ItemData = {
            ...doc.data() as ItemDocument,
            id: doc.id
          };
          inventory.push(item);
        });

        dispatch(setInventory({ inventory }))
      });

      return unsubscribe;
    }
  }, [user]);

  // subscribe to categories
  useEffect(() => {
    if (user?.uid) {
      const categoriesQuery = query(categoriesCollection, where("uid", "==", user.uid));

      const unsubscribe = onSnapshot(categoriesQuery, (snapshot) => {
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
      });

      return unsubscribe;
    }
  }, [user]);
};