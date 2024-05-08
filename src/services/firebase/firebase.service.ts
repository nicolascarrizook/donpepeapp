import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCOqcL6RTP9HI8JurtfK8_YcCAbH5HKw8M",
  authDomain: "restaurant-orders-7cbe1.firebaseapp.com",
  projectId: "restaurant-orders-7cbe1",
  storageBucket: "restaurant-orders-7cbe1.appspot.com",
  messagingSenderId: "232357893064",
  appId: "1:232357893064:web:8a58d1c69b7f723260e6fd",
  measurementId: "G-DTF6373RMQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db };
export { auth };
export { storage };
