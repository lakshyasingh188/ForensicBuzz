import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://bmmmtjsxwufeuvfozkst.supabase.co";
const supabaseKey = "sb_publishable_RiIZNtQDpXve8h6d1ajrFA_xienSBVl";

const supabase = createClient(supabaseUrl, supabaseKey);

// Load topics
async function loadTopics() {
  const { data, error } = await supabase
    .from("topics")
    .select("*");

  if (error) {
    console.error("Topic error:", error);
    return;
  }

  const select = document.getElementById("topicSelect");

  // 🔴 IMPORTANT: purane options remove karo (safety)
  select.innerHTML = `<option value="">Select Topic</option>`;

  data.forEach(topic => {
    const opt = document.createElement("option");
    opt.value = topic.id;

    // ✅ YAHI MAIN FIX HAI
    opt.textContent =
      topic.topic_name || topic.name || topic.title || "Untitled Topic";

    select.appendChild(opt);
  });
}

// Load MCQs
async function loadMCQs(topicId) {
  const { data, error } = await supabase
    .from("mcqs")
    .select("*")
    .eq("topic_id", topicId);

  if (error) {
    console.error("MCQ error:", error);
    return;
  }

  const container = document.getElementById("mcq-list");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No MCQs found.</p>";
    return;
  }

 data.forEach((q, i) => {
  container.innerHTML += `
    <div class="mcq-box">
      <p><b>${i + 1}. ${q.question}</b></p>

      <ul>
        <li>A. ${q.option_a}</li>
        <li>B. ${q.option_b}</li>
        <li>C. ${q.option_c}</li>
        <li>D. ${q.option_d}</li>
      </ul>

      <!-- ✅ CORRECT ANSWER DIRECT SHOW -->
      <p style="color:green; font-weight:600; margin-top:6px;">
        ✔ Correct Answer: ${q.correct_option}
      </p>

      <hr>
    </div>
  `;
});
}

document
  .getElementById("topicSelect")
  .addEventListener("change", e => {
    if (e.target.value) {
      loadMCQs(e.target.value);
    } else {
      document.getElementById("mcq-list").innerHTML = "";
    }
  });

loadTopics();
