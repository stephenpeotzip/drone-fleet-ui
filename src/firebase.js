// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCzVkgyLsMtLTCy7ryNhLbIk-kBySbu4Z4",
  authDomain: "drone-fleet-c5ea5.firebaseapp.com",
  projectId: "drone-fleet-c5ea5",
  storageBucket: "drone-fleet-c5ea5.appspot.com",
  messagingSenderId: "788756577643",
  appId: "1:788756577643:web:1d55b0467a13c348a8a02e"
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
