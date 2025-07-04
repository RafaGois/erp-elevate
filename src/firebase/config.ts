import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "AIzaSyCyO0I79OMRc85eeDbfIsvQ29nm0r38SmA",
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN ?? "teste-81e38.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? "teste-81e38",
  storageBucket: "teste-81e38.firebasestorage.app",
  messagingSenderId: "587730877307",
  appId: "1:587730877307:web:0f78a4f3bf51fde8a09bde",
  measurementId: "G-1YGNSEJQ7E"
};

const app = initializeApp(firebaseConfig);
export { app }