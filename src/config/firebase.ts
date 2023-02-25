import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCZjoE5QFETge633a87EW7lH2KNglYcD4c",
  authDomain: "trailpackpro.firebaseapp.com",
  projectId: "trailpackpro",
  storageBucket: "trailpackpro.appspot.com",
  messagingSenderId: "168717349873",
  appId: "1:168717349873:web:4750b190d89b1652ffca50"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };