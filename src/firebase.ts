// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAldb4tpL1Z4KQZHvAiwhB_AMWVu4FE03U",
    authDomain: "js-firebase-twitter-clone.firebaseapp.com",
    projectId: "js-firebase-twitter-clone",
    storageBucket: "js-firebase-twitter-clone.appspot.com",
    messagingSenderId: "127239359558",
    appId: "1:127239359558:web:e1f61ae79ec3b99ad5ce47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const auth =  getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default db;
