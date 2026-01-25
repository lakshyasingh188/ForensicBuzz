import { supabase } from "./supabase.js";

// protect page
const { data } = await supabase.auth.getUser();

if (!data.user) {
  window.location.href = "admin-login.html";
}
