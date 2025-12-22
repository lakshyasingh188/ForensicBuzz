// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// YOUR FIREBASE CONFIG (UNCHANGED)
const firebaseConfig = {
  apiKey: "AIzaSyA5-LsR0dMDpyZsuXhygC6tDPk5RzGiGZ8",
  authDomain: "forensicbuzz-802d5.firebaseapp.com",
  projectId: "forensicbuzz-802d5",
  storageBucket: "forensicbuzz-802d5.firebasestorage.app",
  messagingSenderId: "110785737752",
  appId: "1:110785737752:web:8e180af63c933ad88c7f6d",
  measurementId: "G-0633PY6W7Q"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
