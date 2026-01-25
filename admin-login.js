import { supabase } from "./supabase.js";

window.sendLink = async function () {
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("msg");

  if (!email) {
    msg.innerText = "Email required";
    return;
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "https://www.forensicbuzz.com/admin-dashboard.html"
    }
  });

  if (error) {
    msg.innerText = error.message;
  } else {
    msg.innerText = "Login link sent to email 📩";
  }
};
