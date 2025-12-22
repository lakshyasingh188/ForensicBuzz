import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// LOGIN
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "admin.html";
  } catch (e) {
    document.getElementById("msg").innerText = "Invalid Admin Credentials";
  }
};

// PROTECT ADMIN PAGE
onAuthStateChanged(auth, (user) => {
  if (!user && location.pathname.includes("admin.html")) {
    window.location.href = "admin-login.html";
  }
});

// LOGOUT
window.logout = async function () {
  await signOut(auth);
  window.location.href = "admin-login.html";
};
