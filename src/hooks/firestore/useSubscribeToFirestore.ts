import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../config/firebase";
import { setPacks } from "../../redux/packsSlice";
import { useDispatch, useSelector } from "../../redux/reduxHooks";

export default function useSubscribeToFirestore() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const packsCollection = collection(db, "packs");

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
};