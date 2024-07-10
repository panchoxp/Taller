// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLk7NKYa73lw7FLwhrpzmzyR2G0XBsZHg",
  authDomain: "proyecto-9a68c.firebaseapp.com",
  databaseURL: "https://proyecto-9a68c-default-rtdb.firebaseio.com",
  projectId: "proyecto-9a68c",
  storageBucket: "proyecto-9a68c.appspot.com",
  messagingSenderId: "508618778648",
  appId: "1:508618778648:web:01997b4a63d03f220abb6d",
  measurementId: "G-2CP1SRD32N"
}; 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);