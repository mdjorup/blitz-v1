// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD21OMGaSlnr8OaY2ulgwQrNyQpgP2FJW8",
  authDomain: "blitz-v0.firebaseapp.com",
  projectId: "blitz-v0",
  storageBucket: "blitz-v0.appspot.com",
  messagingSenderId: "482384035084",
  appId: "1:482384035084:web:dca13ae351bec25ea89d29",
  measurementId: "G-8P297KP5DQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore(app);

export {app, auth, db};