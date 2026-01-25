const supabase = supabaseJs.createClient(
  "https://bmmtjsxwufeuvfozkst.supabase.co",
  "sb_publishable_RiIZNtQDpXve8h6d1ajrFA_xienSBVl"
);

async function loadMCQs() {
  const { data, error } = await supabase
    .from("mcqs")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const box = document.getElementById("mcqBox");
  box.innerHTML = "";

  data.forEach(m => {
    box.innerHTML += `
      <div class="mcq">
        <h3>${m.question}</h3>
        <ul>
          <li>A. ${m.option_a}</li>
          <li>B. ${m.option_b}</li>
          <li>C. ${m.option_c}</li>
          <li>D. ${m.option_d}</li>
        </ul>
      </div>
    `;
  });
}

loadMCQs();
