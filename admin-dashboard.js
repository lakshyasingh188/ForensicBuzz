import { supabase } from "./supabase.js";

// 🔐 protect page
const { data } = await supabase.auth.getUser();
if (!data.user) location.href = "admin-login.html";

const topicSelect = document.getElementById("topicSelect");

// load topics
async function loadTopics() {
  const { data } = await supabase.from("topics").select("*");
  topicSelect.innerHTML = "";
  data.forEach(t => {
    topicSelect.innerHTML += `<option value="${t.id}">${t.title}</option>`;
  });
}
loadTopics();

// add topic
window.addTopic = async () => {
  if (!topicTitle.value) return alert("Enter topic");

  await supabase.from("topics").insert({
    title: topicTitle.value
  });

  topicTitle.value = "";
  loadTopics();
  alert("✅ Topic saved");
};

// add mcq
window.addMCQ = async () => {
  if (!topicSelect.value) return alert("Select topic");

  await supabase.from("mcqs").insert({
    topic_id: topicSelect.value,
    question: q.value,
    option_a: a.value,
    option_b: b.value,
    option_c: c.value,
    option_d: d.value,
    correct_option: ans.value
  });

  q.value = a.value = b.value = c.value = d.value = ans.value = "";
  alert("✅ MCQ saved");
};
