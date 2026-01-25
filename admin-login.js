import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://bmmtjsxwufevufovzkst.supabase.co",
  "sb_publishable_RiIZNtQDpXve8h6d1ajrFA_xienSBVl"
);

// protect page
const { data } = await supabase.auth.getUser();
if (!data.user) {
  window.location.href = "admin-login.html";
}
