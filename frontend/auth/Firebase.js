import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAe6hObqc6ZDGnqyanqGuGCOpl4LaD9Qjc",
    authDomain: "appoinmentsystem-ff738.firebaseapp.com",
    projectId: "appoinmentsystem-ff738",
    storageBucket: "appoinmentsystem-ff738.appspot.com",
    messagingSenderId: "421230633317",
    appId: "1:421230633317:web:057aed728d515ac0a1818c",
    measurementId: "G-X421FH5PEG"
  };
  

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };