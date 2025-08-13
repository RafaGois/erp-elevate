import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "AIzaSyCbzve3n4rsGPQGpYzWWEE3SP42P6cYUeI",
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN ?? "erp-elevate.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? "erp-elevate",
  storageBucket: "erp-elevate.firebasestorage.app",
  messagingSenderId: "891154805380",
  appId: "1:891154805380:web:67e48f0c5edd796099c8d1",
  measurementId: "G-N93LWR2L7S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };