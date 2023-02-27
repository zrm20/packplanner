import { Alert } from "react-native";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "../../redux/reduxHooks";
import { clearUser, setError, setIsLoading, setUser } from "../../redux/userSlice";
import { auth as authInstance } from "../../config/firebase";
import { authErrorExtractor } from "../../utils";

export default function useUser() {
  const dispatch = useDispatch();
  const userSlice = useSelector(state => state.user);

  function login(email: string, password: string, callback?: Function): void {
    dispatch(setIsLoading(true));
    dispatch(setError(null));

    signInWithEmailAndPassword(authInstance, email, password)
      .then(userCredential => {
        const user: User = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName
        };

        dispatch(setUser({ user }));
        dispatch(setIsLoading(false));

        if (callback) {
          callback();
        };
      })
      .catch(err => {
        const errorMessage = authErrorExtractor(err);
        dispatch(setError(errorMessage));
        dispatch(setIsLoading(false));
      });
  };

  function logout(): void {
    dispatch(setIsLoading(true));

    signOut(authInstance)
      .then(() => {
        dispatch(clearUser());
        dispatch(setIsLoading(false));
      })
      .catch(err => {
        const errorMessage = authErrorExtractor(err);
        dispatch(setIsLoading(false));
        dispatch(setError(errorMessage));
        Alert.alert("Logout failed", errorMessage)
      })
  }

  function register(userData: RegisterFormData, callback?: Function): void {
    if (userData.password !== userData.confirmPassword) {
      throw new Error("Passwords do not match");
    };

    dispatch(setIsLoading(true)); // start loading

    createUserWithEmailAndPassword(authInstance, userData.email, userData.password)
      .then(userCredential => {
        // success, userCredential is returned

        const user: User = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName
        };

        dispatch(setUser({ user })); // add user to store

        dispatch(setIsLoading(false)); // set loading to false

        if (callback) {
          callback(); // callback for navigating after success
        };
      })
      .catch(err => {
        const errorMessage = authErrorExtractor(err);
        dispatch(setError(errorMessage));
        dispatch(setIsLoading(false));
        console.error(err);
      })
  };

  return {
    ...userSlice,
    login,
    logout,
    register
  };
};