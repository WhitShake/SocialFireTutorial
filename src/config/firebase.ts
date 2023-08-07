// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbObLVoi_kjIMRtdMzM9h9Oal0gEVVk-Y",
    authDomain: "social-tut-93a43.firebaseapp.com",
    projectId: "social-tut-93a43",
    storageBucket: "social-tut-93a43.appspot.com",
    messagingSenderId: "978343041373",
    appId: "1:978343041373:web:ba305c0e009078cc6bb0b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);