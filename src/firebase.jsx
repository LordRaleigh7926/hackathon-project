import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGTklMpO4eY00Ri9q3pwkg8B672OgsGyg",
    authDomain: "education-proj-hackathon.firebaseapp.com",
    projectId: "education-proj-hackathon",
    storageBucket: "education-proj-hackathon.appspot.com",
    messagingSenderId: "1087488082925",
    appId: "1:1087488082925:web:718f6aa2ad4eac19531de4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };