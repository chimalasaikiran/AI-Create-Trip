// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2kLgh_GTcYL6TLLHxQ9UZ3gkBGbxNglo",
  authDomain: "ai-trip-planner-8ba95.firebaseapp.com",
  projectId: "ai-trip-planner-8ba95",
  storageBucket: "ai-trip-planner-8ba95.firebasestorage.app",
  messagingSenderId: "1025170325710",
  appId: "1:1025170325710:web:63050f736e84912c99109f",
  measurementId: "G-GBH4YBJVRQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);