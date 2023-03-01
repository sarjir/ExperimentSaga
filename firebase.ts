// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDFDyTOEwQtOtZQiKi9td7_Wb1FiEIMQ-s',
  authDomain: 'experimentsaga.firebaseapp.com',
  projectId: 'experimentsaga',
  storageBucket: 'experimentsaga.appspot.com',
  messagingSenderId: '868251810068',
  appId: '1:868251810068:web:f1708942fad17507426a01',
  measurementId: 'G-2NMQJ44K4L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
console.log('do we ever get here?');
