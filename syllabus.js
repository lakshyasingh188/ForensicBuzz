import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://bmmmtjsxwufeuvfozkst.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbW10anN4d3VmZXV2Zm96a3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNTYyODQsImV4cCI6MjA4NDgzMjI4NH0.btRW1CHoUbJodnXyvoUdji32dbwJW92mQOMXn7jVckM";
console.log("SUPABASE URL CHECK 👉", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

const bucket = "syllabus.image";
const gallery = document.getElementById("gallery");

async function loadFiles() {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list("", { limit: 100 });

    if (error) throw error;

    gallery.innerHTML = "";

    if (!data || data.length === 0) {
      gallery.innerHTML = "<p>No files found</p>";
      return;
    }

    data.forEach(file => {

  // ❌ sirf empty placeholder skip karo
  if (file.name === ".emptyFolderPlaceholder") return;

  const ext = file.name.split(".").pop().toLowerCase();

  const { data: pub } = supabase.storage
    .from(bucket)
    .getPublicUrl(file.name);

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="topic">${file.name}</div>
    <a href="${pub.publicUrl}" download target="_blank">
      <button>Download</button>
    </a>
  `;

  gallery.appendChild(card);
});

  } catch (err) {
    console.error("FINAL ERROR:", err);
    gallery.innerHTML =
      "<p style='color:red'>Unable to load files</p>";
  }
}

loadFiles();
