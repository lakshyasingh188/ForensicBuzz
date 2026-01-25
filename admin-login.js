import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://bmmtjsxwufevufovzkst.supabase.co",
  "sb_publishable_RiIZNtQDpXve8h6d1ajrFA_xienSBVl"
);

window.login = async function () {
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (!email || !password) {
    alert("Email aur password required");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  window.location.href = "admin-dashboard.html";
};
