// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArc0-5sdGD9nYsgQ4GlLeHa5y5shZcZVs",
  authDomain: "nfc-digitalcard.firebaseapp.com",
  projectId: "nfc-digitalcard",
  storageBucket: "nfc-digitalcard.appspot.com",
  messagingSenderId: "331805454192",
  appId: "1:331805454192:web:386bbfc6350671108829b5",
  measurementId: "G-1K38VY959D"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export const imagedb = storage;