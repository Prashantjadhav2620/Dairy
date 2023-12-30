
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';

//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCe48QogJpRXy_5qMCn1xNl2IfbEBoKP8g",
  authDomain: "dairyprojectapp-8fafd.firebaseapp.com",
  projectId: "dairyprojectapp-8fafd",
  storageBucket: "dairyprojectapp-8fafd.appspot.com",
  messagingSenderId: "496092051946",
  appId: "1:496092051946:web:0049d66c84fcaad64e5a93",
  measurementId: "G-BM30YN8E1C"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;