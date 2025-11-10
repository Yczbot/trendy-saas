// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwDd08cOdZRrc7SG51_BMTe1tAKnDiZtI",
  authDomain: "trendy-saas-a59aa.firebaseapp.com",
  projectId: "trendy-saas-a59aa",
  storageBucket: "trendy-saas-a59aa.firebasestorage.app",
  messagingSenderId: "376929802779",
  appId: "1:376929802779:web:5d7f9ed0fc3e6a405476be",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
