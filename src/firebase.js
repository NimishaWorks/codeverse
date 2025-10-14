import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase Configuration for CodeVerse Project
// ⚠️ IMPORTANT: Replace these with your actual Firebase credentials
// Get from: Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: "AIzaSyARB4FQ95LemLLeL1uw7raAqN1pPUobTaY",
  authDomain: "codeverse.firebaseapp.com", // or your custom domain
  projectId: "codeverse",
  storageBucket: "codeverse.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
// Optional: Add custom parameters
googleProvider.setCustomParameters({
  prompt: 'select_account' // Force account selection every time
});

export default app;
