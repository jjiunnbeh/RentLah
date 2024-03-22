// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rentlah-667e3.firebaseapp.com",
  projectId: "rentlah-667e3",
  storageBucket: "rentlah-667e3.appspot.com",
  messagingSenderId: "779432628839",
  appId: "1:779432628839:web:973a27861b0a2c90e47ac2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);