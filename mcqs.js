import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://bmmntjsxwufeuvfozkst.supabase.co";
const supabaseKey = "sb_publishable_RiIZNtQDpXve8h6d1ajrFA_xienSBVl";

const supabase = createClient(supabaseUrl, supabaseKey);

async function loadMCQs() {
  const { data, error } = await supabase
    .from("mcqs")
    .select("question");

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  const container = document.getElementById("mcq-list");

  if (!container) {
    console.error("mcq-list div not found");
    return;
  }

  container.innerHTML = "";

  data.forEach((item, index) => {
    const p = document.createElement("p");
    p.textContent = `${index + 1}. ${item.question}`;
    container.appendChild(p);
  });
}

loadMCQs();
