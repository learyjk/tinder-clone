import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDFCMS1ctS0Zl2zux2oQgZchhAXwcOkPFk",
  authDomain: "food-delivery-f2e40.firebaseapp.com",
  projectId: "food-delivery-f2e40",
  storageBucket: "food-delivery-f2e40.appspot.com",
  messagingSenderId: "824542813966",
  appId: "1:824542813966:web:9d36756fdb72b16c61015f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
