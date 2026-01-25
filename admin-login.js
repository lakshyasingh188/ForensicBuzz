import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://bmmtjsxwufevufovzkst.supabase.co";
const supabaseKey = "sb_publishable_RiIZNtQDpXve8h6d1ajrFA_xienSBVl";

const supabase = createClient(supabaseUrl, supabaseKey);

window.login = async function () {
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (!email || !password) {
    alert("Email aur password required hai");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  alert("Login successful!");
  window.location.href = "admin-dashboard.html";
};
