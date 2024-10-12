// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f8eda.firebaseapp.com",
  projectId: "mern-blog-f8eda",
  storageBucket: "mern-blog-f8eda.appspot.com",
  messagingSenderId: "1012420191639",
  appId: "1:1012420191639:web:929eade9a7065d4476d0d2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);