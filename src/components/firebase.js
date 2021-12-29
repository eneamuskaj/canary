//firebase configuration
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDPYuJjBrqhOn82CFz9F2jUZZ4hAajE5g",
  authDomain: "canary-3ee71.firebaseapp.com",
  projectId: "canary-3ee71",
  storageBucket: "canary-3ee71.appspot.com",
  messagingSenderId: "82441529549",
  appId: "1:82441529549:web:26e2d73126d91970eca184",
  storageBucket: "gs://canary-3ee71.appspot.com",
};
//initialize firebase
const firebase = initializeApp(firebaseConfig);
//initialize service
const db = getFirestore();
//collection ref
export const colRef = collection(db, "feed");

export const colRef2 = collection(
  db,
  "feed/" + "drVPxRYnkUHt2zOQ72A1" + "/com"
);
