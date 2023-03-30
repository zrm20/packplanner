import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  EmailAuthProvider,
  linkWithCredential,
} from 'firebase/auth';
import { Alert } from 'react-native';

import { auth as authInstance } from '../../config/firebase';
import { clearMyPack } from '../../redux/myPackSlice';
import { useDispatch, useSelector } from '../../redux/reduxHooks';
import { clearUser, setError, setIsLoading, setUser } from '../../redux/userSlice';
import { authErrorExtractor } from '../../utils';

export default function useUser() {
  const dispatch = useDispatch();
  const userSlice = useSelector((state) => state.user);

  function loginAsGuest(): void {
    dispatch(setIsLoading(true));
    dispatch(setError(null));

    signInAnonymously(authInstance)
      .then((userCredential) => {
        const user: GuestUser = { uid: userCredential.user.uid };

        dispatch(setUser({ user }));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        const errorMessage = authErrorExtractor(err);
        dispatch(setError(errorMessage));
        dispatch(setIsLoading(false));
      });
  }

  function login(email: string, password: string, callback?: Function): void {
    dispatch(setIsLoading(true));
    dispatch(setError(null));

    signInWithEmailAndPassword(authInstance, email, password)
      .then((userCredential) => {
        const user: User = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName,
        };

        dispatch(setUser({ user }));
        dispatch(setIsLoading(false));

        if (callback) {
          callback();
        }
      })
      .catch((err) => {
        const errorMessage = authErrorExtractor(err);
        dispatch(setError(errorMessage));
        dispatch(setIsLoading(false));
      });
  }

  function logout(): void {
    dispatch(setIsLoading(true)); // start loading
    dispatch(setError(null)); // reset error

    signOut(authInstance)
      .then(() => {
        dispatch(clearUser());
        dispatch(setIsLoading(false));
        dispatch(clearMyPack());
      })
      .catch((err) => {
        const errorMessage = authErrorExtractor(err);
        dispatch(setIsLoading(false));
        dispatch(setError(errorMessage));
        Alert.alert('Logout failed', errorMessage);
      });
  }

  function handleGuestLogout(): void {
    Alert.alert(
      'Warning, you will lose your data!',
      'You are about to log out as a guest. All of your data including inventory, packs and lists will be lost.\n\nYou can register for an account to save your data online. Do you want to continue logging out?',
      [
        {
          text: 'Yes, erase my data and log out',
          style: 'destructive',
          onPress: logout,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  }

  function register(userData: RegisterFormData, callback?: Function): void {
    if (userData.password !== userData.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    dispatch(setIsLoading(true)); // start loading
    dispatch(setError(null)); // reset error

    createUserWithEmailAndPassword(authInstance, userData.email, userData.password)
      .then((userCredential) => {
        // success, userCredential is returned

        const user: User = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName,
        };

        dispatch(setUser({ user })); // add user to store

        dispatch(setIsLoading(false)); // set loading to false

        if (callback) {
          callback(); // callback for navigating after success
        }
      })
      .catch((err) => {
        const errorMessage = authErrorExtractor(err);
        dispatch(setError(errorMessage));
        dispatch(setIsLoading(false));
      });
  }

  function registerGuest(userData: RegisterFormData, callback?: Function): void {
    if (userData.password !== userData.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    dispatch(setIsLoading(true)); // start loading
    dispatch(setError(null)); // reset error

    const credential = EmailAuthProvider.credential(userData.email, userData.password);

    linkWithCredential(authInstance.currentUser!, credential)
      .then((userCredential) => {
        // success, userCredential is returned

        const user: User = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName,
        };

        dispatch(setUser({ user })); // add user to store

        dispatch(setIsLoading(false)); // set loading to false

        if (callback) {
          callback(); // callback for navigating after success
        }
      })
      .catch((err) => {
        const errorMessage = authErrorExtractor(err);
        dispatch(setError(errorMessage));
        dispatch(setIsLoading(false));
      });
  }

  return {
    ...userSlice,
    login,
    loginAsGuest,
    logout,
    handleGuestLogout,
    register,
    registerGuest,
  };
}
