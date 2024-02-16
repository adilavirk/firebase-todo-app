// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq6NDOviFgnYqYOi_lExoCxGVBaynoIGk",
  authDomain: "fir-todo-app-89be5.firebaseapp.com",
  projectId: "fir-todo-app-89be5",
  storageBucket: "fir-todo-app-89be5.appspot.com",
  messagingSenderId: "575736528280",
  appId: "1:575736528280:web:94728d0d7a1c84ef5dffed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
