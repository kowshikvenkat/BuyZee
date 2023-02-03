// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore,getDocs,where,query,addDoc,collection,doc} from 'firebase/firestore';
import React from "react";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcnCJh4KOm8Z9Qj1s0TOf86LaG7XxBNXw",
  authDomain: "buyzee-fa223.firebaseapp.com",
  projectId: "buyzee-fa223",
  storageBucket: "buyzee-fa223.appspot.com",
  messagingSenderId: "699319607924",
  appId: "1:699319607924:web:1d7f86870bd295bfdd6721"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app)
export const login = sessionStorage.getItem('email')