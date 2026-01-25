import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://bmmmtjsxwufevufvzkst.supabase.co",
  "sb_publishable_R1ZNtQDpXve8h6d1ajrFA_xienSBVI"
);

window.login = async function () {
  const email = document.getElementById("emailInput").value.trim();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "https://www.forensicbuzz.com/admin-dashboard.html"
    }
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Check your email for login link");
  }
};
