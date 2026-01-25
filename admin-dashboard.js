import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://bmmmtjsxwufevufovzkst.supabase.co",
  "sb_publishable_RiIZNtQDpXve8h6d1ajrFA_xienSBVl"
);

// 🔐 Protect dashboard
const { data } = await supabase.auth.getUser();

if (!data.user || data.user.email !== "betterhalf0107@gmail.com") {
  window.location.href = "/admin-login.html";
}

window.logout = async function () {
  await supabase.auth.signOut();
  window.location.href = "/admin-login.html";
};
