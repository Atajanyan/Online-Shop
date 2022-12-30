// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
 import { getFunctions } from 'firebase/functions'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA-rHwuYW5geSjCDFVopC7ksrX9IElSjsU',
  authDomain: 'cestlahome.firebaseapp.com',
  projectId: 'cestlahome',
  storageBucket: 'cestlahome.appspot.com',
  messagingSenderId: '182204258899',
  appId: '1:182204258899:web:e151e9b059bbba025504a6',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)


export const functions = getFunctions(app)