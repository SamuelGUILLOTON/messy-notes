// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";


import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARXqxw-bP4GAOQXLBc7h4Sr5xGMaacHx0",
  authDomain: "note-app-25f6f.firebaseapp.com",
  projectId: "note-app-25f6f",
  storageBucket: "note-app-25f6f.appspot.com",
  messagingSenderId: "664709966876",
  appId: "1:664709966876:web:a8b24fc5605a147a9d43d9",
  measurementId: "G-W3BK5Y1Y7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth();




