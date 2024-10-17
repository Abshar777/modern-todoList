import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider,getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCw0YsOUKp8MR1cHjwbew_8le8mtvTOgv4",
  authDomain: "todo-list-e596e.firebaseapp.com",
  projectId: "todo-list-e596e",
  storageBucket: "todo-list-e596e.appspot.com",
  messagingSenderId: "788810938543",
  appId: "1:788810938543:web:8748afccb9f0b30dfdfc5a",
  measurementId: "G-H54ESM66HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider()