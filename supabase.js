import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://bmmtjsxwufeuvfozkst.supabase.co",  // ✅ Correct URL
  "sb_publishable_RiIZNtQDpXve8h6d1ajrFA_xienSBV"
);
