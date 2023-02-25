import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "../../redux/reduxHooks";
import { clearUser, setError, setIsLoading, setUser } from "../../redux/userSlice";
import { auth as authInstance } from "../../config/firebase";

export default function useUser() {
  const dispatch = useDispatch();
  const userSlice = useSelector(state => state.user);

  function login(email: string, password: string): void {
    dispatch(setIsLoading(true));

    signInWithEmailAndPassword(authInstance, email, password)
      .then(userCredential => {
        const user: User = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName
        };

        dispatch(setUser({ user }));
        dispatch(setIsLoading(false));
      })
      .catch(err => {
        dispatch(setError(err?.message || "Something went wrong"));
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
        dispatch(setIsLoading(false));
        dispatch(setError(err.message || "Something went wrong"));
        console.error(err);
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
        dispatch(setError(err?.message || "Something went wrong"));
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