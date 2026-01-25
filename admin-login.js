import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://bmmmtjsxwufevufovzkst.supabase.co",
  "sb_publishable_XXXXXXXXXXXXXXXXXXXX"
);

// 🔒 ONLY THIS EMAIL IS ADMIN
const ADMIN_EMAIL = "betterhalf0107@gmail.com";

window.sendLink = async function () {
  const email = document.getElementById("emailInput").value.trim();
  const msg = document.getElementById("msg");

  if (email !== ADMIN_EMAIL) {
    msg.innerText = "You are not authorized as admin";
    msg.style.color = "red";
    return;
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo:
        "https://www.forensicbuzz.com/admin-dashboard.html",
    },
  });

  if (error) {
    msg.innerText = error.message;
    msg.style.color = "red";
  } else {
    msg.innerText = "Login link sent to your email";
    msg.style.color = "green";
  }
};
