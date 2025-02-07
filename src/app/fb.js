import { initializeApp } from "firebase/app";


import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {

  apiKey: "AIzaSyCYnMC2mabJm-1TSoiZxASuBNSAKdNYZ-k",

  authDomain: "music-site-479c0.firebaseapp.com",

  projectId: "music-site-479c0",

  storageBucket: "music-site-479c0.firebasestorage.app",

  messagingSenderId: "45404718462",

  appId: "1:45404718462:web:b4aa44b77d75e5db781f2f",

  measurementId: "G-H1GYZPCJGF"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth};