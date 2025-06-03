
// import { initializeApp } from "firebase/app";]
import firebase from "firebase/compat/app";

//auth
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC51szWaN2-z9I66o6LzlOfEumV-nYMkJU",
  authDomain: "clone-c0994.firebaseapp.com",
  projectId: "clone-c0994",
  storageBucket: "clone-c0994.firebasestorage.app",
  messagingSenderId: "523792980822",
  appId: "1:523792980822:web:6ad8e7ce0ffb54803ad4f7",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();

