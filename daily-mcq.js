// 🔥 SUPABASE DETAILS
const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY";

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

const container = document.getElementById("mcqContainer");

async function loadDailyMCQs() {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("daily_mcqs")
    .select("*")
    .gt("expires_at", now)
    .order("created_at", { ascending: true });

  container.innerHTML = "";

  if (error || !data || data.length === 0) {
    container.innerHTML =
      "<p class='loading'>No Daily MCQs available right now.</p>";
    return;
  }

  data.forEach((mcq, index) => {
    const card = document.createElement("div");
    card.className = "mcq-card";

    card.innerHTML = `
      <h3>Q${index + 1}. ${mcq.question}</h3>
      <div class="options">
        ${mcq.options.map(opt => `
          <label>
            <input type="radio" name="q${index}">
            <span>${opt}</span>
          </label>
        `).join("")}
      </div>
    `;

    container.appendChild(card);
  });
}

loadDailyMCQs();
