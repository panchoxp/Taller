
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAbdhThaPzvHkDnK8GmyTSmjd2S8mIFkMk",
  authDomain: "proyecto-ca079.firebaseapp.com",
  databaseURL: "https://proyecto-ca079-default-rtdb.firebaseio.com",
  projectId: "proyecto-ca079",
  storageBucket: "proyecto-ca079.appspot.com",
  messagingSenderId: "258398495310",
  appId: "1:258398495310:web:f367e6f5ddcf9efecfd91f"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);//subir imagen