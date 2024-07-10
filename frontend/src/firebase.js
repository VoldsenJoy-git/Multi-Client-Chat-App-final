// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgVSCXZjq72nzoR81D_dpxN6KRUcCtjnU",
  authDomain: "multi-client-chat-app.firebaseapp.com",
  projectId: "multi-client-chat-app",
  storageBucket: "multi-client-chat-app.appspot.com",
  messagingSenderId: "542841421936",
  appId: "1:542841421936:web:7de8c6a80e18e2f26ab4b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 
//This code snippet demonstrates how to set up Firebase in a
// React project to use Firebase Storage. 