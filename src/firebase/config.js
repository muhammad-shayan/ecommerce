// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from 'firebase/storage'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwM3xi_aYrNf6ohKTmecKYdcI0VvBF3z8",
  authDomain: "ecommerce-a90fb.firebaseapp.com",
  projectId: "ecommerce-a90fb",
  storageBucket: "ecommerce-a90fb.appspot.com",
  messagingSenderId: "165699143520",
  appId: "1:165699143520:web:8455c681e1c8db338a8005"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app