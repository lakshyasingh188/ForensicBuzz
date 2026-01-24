import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Auto redirect if already logged in
onAuthStateChanged(auth, user => {
  if (user) {
    location.href = "admin-dashboard.html";
  }
});

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const err = document.getElementById("err");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    location.href = "admin-dashboard.html";
  } catch (e) {
    err.innerText = "Invalid email or password";
  }
};
