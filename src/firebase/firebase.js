// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZHlBsZisnZqkFo6Vr743oglylkOg5a34",
  authDomain: "discoverly-01.firebaseapp.com",
  projectId: "discoverly-01",
  storageBucket: "discoverly-01.firebasestorage.app",
  messagingSenderId: "141190570368",
  appId: "1:141190570368:web:0ddd87c8be884104906165",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence enabled.");
  })
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });
export { app, auth, db };
