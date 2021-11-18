import firebase from 'firebase/app';
import 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEr1riByT2VwTfvaJW6cOKZJUs-MT0bkA",
  authDomain: "evaluacion2pwa.firebaseapp.com",
  projectId: "evaluacion2pwa",
  storageBucket: "evaluacion2pwa.appspot.com",
  messagingSenderId: "36232160423",
  appId: "1:36232160423:web:2557ab4bed9d1bc9a66782"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)