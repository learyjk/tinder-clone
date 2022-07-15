import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFCMS1ctS0Zl2zux2oQgZchhAXwcOkPFk",
  authDomain: "food-delivery-f2e40.firebaseapp.com",
  projectId: "food-delivery-f2e40",
  storageBucket: "food-delivery-f2e40.appspot.com",
  messagingSenderId: "824542813966",
  appId: "1:824542813966:web:9d36756fdb72b16c61015f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = initializeFirestore(app, {
  // https://github.com/firebase/firebase-js-sdk/issues/1674
  // I had to use this to get firestore to connect
  experimentalAutoDetectLongPolling: true,
});

export { auth, db };
