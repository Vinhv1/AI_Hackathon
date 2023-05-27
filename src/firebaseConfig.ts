// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDaZ8-3V5bnrOm2M_T7y8QjBaTYxAQ4Tnc",
  authDomain: "ai-app-36606.firebaseapp.com",
  databaseURL: "https://ai-app-36606-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ai-app-36606",
  storageBucket: "ai-app-36606.appspot.com",
  messagingSenderId: "671809207410",
  appId: "1:671809207410:web:dec16e37fc2e1b786a56eb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);