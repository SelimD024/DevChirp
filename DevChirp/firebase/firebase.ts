// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJhS7LHPEPDWiF1XZBL9T5YJg3DmhZ7xI",
  authDomain: "devchirp-8b119.firebaseapp.com",
  projectId: "devchirp-8b119",
  storageBucket: "devchirp-8b119.appspot.com",
  messagingSenderId: "1034679084",
  appId: "1:1034679084:web:67845cd7b9f7d0aeb7b289"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//export functie om firebase te initialize

export const initFirebase = () => {
  return app;
}