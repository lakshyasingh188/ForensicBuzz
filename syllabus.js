/* ===============================
   SUPABASE SETUP (ESM)
================================ */
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://bmmtjsxwufeuvfovzkst.supabase.co";
const supabaseKey = "sb_publishable_RiIZNtQDpXve8h6d1ajrFA_xienSBV";

const supabase = createClient(supabaseUrl, supabaseKey);
const bucket = "syllabus.image";

/* ===============================
   DOM
================================ */
const gallery = document.getElementById("gallery");

/* ===============================
   HELPERS
================================ */
function formatTitle(name) {
  return name
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

/* ===============================
   DEBUG LOAD
================================ */
async function loadFiles() {
  console.log("🔵 loadFiles() called");

  const { data, error } = await supabase.storage
    .from(bucket)
   .list("Files", { limit: 100 })
  console.log("📦 list() response:", data);
  console.log("❌ list() error:", error);

  if (error) {
    gallery.innerHTML = "<p style='color:red'>Supabase list error</p>";
    return;
  }

  if (!data || data.length === 0) {
    gallery.innerHTML = "<p style='color:yellow'>No files found in bucket</p>";
    return;
  }

  data.forEach(file => {
    if (!file.name) return;

    const { data: publicData } =
      supabase.storage.from(bucket).getPublicUrl(file.name);

    console.log("🔗 Public URL:", publicData.publicUrl);

    const card = document.createElement("div");
    card.style.border = "1px solid #334155";
    card.style.padding = "10px";
    card.style.margin = "10px";

    card.innerHTML = `
      <div>${formatTitle(file.name)}</div>
      <a href="${publicData.publicUrl}" target="_blank">Open</a>
    `;

    gallery.appendChild(card);
  });
}

/* ===============================
   INIT
================================ */
loadFiles();
