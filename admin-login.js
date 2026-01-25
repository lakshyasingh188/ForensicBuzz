import { supabase } from "./supabase.js";

window.login = async function () {
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (!email || !password) {
    alert("Email aur password required hai");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "admin-dashboard.html";
  } catch (e) {
    alert("Network error: " + e.message);
  }
};
