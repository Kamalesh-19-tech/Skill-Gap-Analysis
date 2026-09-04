// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChSazHfAN3ZRMIzGMfoj17zMMrieAUGIM",
  authDomain: "authentication-dfbb5.firebaseapp.com",
  projectId: "authentication-dfbb5",
  storageBucket: "authentication-dfbb5.firebasestorage.app",
  messagingSenderId: "912399984043",
  appId: "1:912399984043:web:9b562c5a5e639d10641eee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
