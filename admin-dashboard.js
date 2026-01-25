import { supabase } from "./supabase.js";

const { data } = await supabase.auth.getUser();

if (!data.user) {
  window.location.href = "admin-login.html";
}

window.logout = async function () {
  await supabase.auth.signOut();
  window.location.href = "admin-login.html";
};
