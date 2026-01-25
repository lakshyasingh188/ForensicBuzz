import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ✅ Supabase config
const supabaseUrl = "https://bmmtjsxwufevufovzkst.supabase.co";
const supabaseKey = "sb_publishable_RiIZNtQDpXve8h6d1ajrFA_xienSBVl";

// ✅ Create client
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Login function (button se call hota hai)
window.login = async function () {
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (!email || !password) {
    alert("Email aur Password dono required hain");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    // ✅ Success
    alert("Login successful");
    window.location.href = "admin-dashboard.html";

  } catch (err) {
    console.error(err);
    alert("Failed to fetch (network / hosting issue)");
  }
};
