import { supabase } from "./supabase.js";

const mcqList = document.getElementById("mcqList");

const { data } = await supabase
  .from("mcqs")
  .select("question, option_a, option_b, option_c, option_d");

data.forEach(m => {
  mcqList.innerHTML += `
    <div class="box">
      <p><b>${m.question}</b></p>
      <p>A. ${m.option_a}</p>
      <p>B. ${m.option_b}</p>
      <p>C. ${m.option_c}</p>
      <p>D. ${m.option_d}</p>
    </div>
  `;
});
