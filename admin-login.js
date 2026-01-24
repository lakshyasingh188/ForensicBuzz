import { supabase } from "./supabase.js";

window.login = async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("❌ Invalid email or password");
  } else {
    location.href = "admin-dashboard.html";
  }
};
