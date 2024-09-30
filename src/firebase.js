import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdwpUjq_dOVablzapc9v6rEUZBOVm9Vao",
  authDomain: "pennywise-ba97a.firebaseapp.com",
  projectId: "pennywise-ba97a",
  storageBucket: "pennywise-ba97a.appspot.com",
  messagingSenderId: "440895576230",
  appId: "1:440895576230:web:336a9381d4ca9d6a53bc67",
  measurementId: "G-H3QJ0WLSGX"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };