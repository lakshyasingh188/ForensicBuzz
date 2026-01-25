// admin-dashboard.js
import { supabase } from "./supabase.js";

// protect page
const { data } = await supabase.auth.getUser();
if (!data.user) {
  window.location.href = "admin-login.html";
}

// elements
const topicTitle = document.getElementById("topicTitle");
const topicSelect = document.getElementById("topicSelect");

// load topics
async function loadTopics() {
  const { data, error } = await supabase
    .from("topics")
    .select("*")
    .order("id");

  if (error) {
    alert(error.message);
    return;
  }

  topicSelect.innerHTML = "";
  data.forEach(t => {
    topicSelect.innerHTML += `<option>${t.title}</option>`;
  });
}
loadTopics();

// add topic
window.addTopic = async function () {
  if (!topicTitle.value.trim()) {
    alert("Enter topic");
    return;
  }

  const { error } = await supabase
    .from("topics")
    .insert({ title: topicTitle.value.trim() });

  if (error) {
    alert(error.message);
    return;
  }

  topicTitle.value = "";
  loadTopics();
};
