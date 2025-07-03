import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf8lUcoUpGh9YXewW7mtgG6qcWoJfp7AU",
  authDomain: "shopping-list-app-36a49.firebaseapp.com",
  projectId: "shopping-list-app-36a49",
  storageBucket: "shopping-list-app-36a49.firebasestorage.app",
  messagingSenderId: "173830058165",
  appId: "1:173830058165:web:501f90ed28f09284968efc",
  measurementId: "G-JW3QG5HLS2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
 
export { db };

