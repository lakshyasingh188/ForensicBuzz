import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOZiAJJ8CvY8ScX4SjWk64jrvULN2LZA",
  authDomain: "forensicbuzz1.firebaseapp.com",
  projectId: "forensicbuzz1",
  storageBucket: "forensicbuzz1.firebasestorage.app",
  messagingSenderId: "557090337648",
  appId: "1:557090337648:web:147fddd95747880a5415b5"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
