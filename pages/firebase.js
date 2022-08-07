// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{ getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQMCUVtwjc5vqx_kOXxyx-FDrYegib53E",
  authDomain: "nextjs-firebase-98eb7.firebaseapp.com",
  projectId: "nextjs-firebase-98eb7",
  storageBucket: "nextjs-firebase-98eb7.appspot.com",
  messagingSenderId: "447251082441",
  appId: "1:447251082441:web:987a509f8f724226de7118"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export{db}