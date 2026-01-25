<script type="module">
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://bmmmtjsxwufeuvfozkst.supabase.co";
const supabaseKey = "sb_publishable_RiIZNtQDpXve8h6d1ajrFA_xienSBVl";

const supabase = createClient(supabaseUrl, supabaseKey);

async function loadMCQs() {
  const { data, error } = await supabase
    .from("mcqs")
    .select("id, question, option_a, option_b, option_c, option_d");

  if (error) {
    console.error(error);
    return;
  }

  const box = document.getElementById("mcqBox");
  box.innerHTML = "";

  data.forEach((q, i) => {
    box.innerHTML += `
      <div style="margin-bottom:20px">
        <h3>Q${i + 1}. ${q.question}</h3>
        <ul>
          <li>${q.option_a}</li>
          <li>${q.option_b}</li>
          <li>${q.option_c}</li>
          <li>${q.option_d}</li>
        </ul>
      </div>
    `;
  });
}

loadMCQs();
</script>
