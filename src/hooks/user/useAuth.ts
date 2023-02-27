import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import { useDispatch } from "../../redux/reduxHooks";
import { setUser, clearUser } from "../../redux/userSlice";
import { auth } from "../../config/firebase";

export default function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userResult) => {
      if (userResult) {
        const user: User = {
          name: userResult.displayName,
          uid: userResult.uid,
          email: userResult.email
        };


        dispatch(setUser({ user }));
      } else {
        dispatch(clearUser());
      };
    })
  }, [auth])
}