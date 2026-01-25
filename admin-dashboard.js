import { supabase } from "./supabase.js";

async function protectDashboard() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    window.location.href = "admin-login.html";
    return;
  }

  console.log("Admin logged in:", data.user.email);
}

protectDashboard();
