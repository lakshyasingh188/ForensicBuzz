const SUPABASE_URL = "https://bmmmtjsxwufeuvfozkst.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbW10anN4d3VmZXV2Zm96a3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNTYyODQsImV4cCI6MjA4NDgzMjI4NH0.btRW1CHoUbJodnXyvoUdji32dbwJW92mQOMXn7jVckM";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const BUCKET_NAME = "previous-year";

const fileContainer = document.getElementById("fileContainer");
const viewer = document.getElementById("viewer");
const viewerFrame = document.getElementById("viewerFrame");
const downloadBtn = document.getElementById("downloadBtn");
const closeViewer = document.getElementById("closeViewer");

async function loadFiles() {
  const { data, error } = await supabaseClient.storage
    .from(BUCKET_NAME)
    .list("", { sortBy: { column: "created_at", order: "desc" } });

  if (error) {
    console.error(error);
    return;
  }

  fileContainer.innerHTML = "";

  data.forEach(file => {
    const { data: urlData } = supabaseClient.storage
      .from(BUCKET_NAME)
      .getPublicUrl(file.name);

    const li = document.createElement("li");
    li.textContent = file.name;
    li.onclick = () => openViewer(urlData.publicUrl);

    fileContainer.appendChild(li);
  });
}

function openViewer(url) {
  viewer.style.display = "block";
  viewerFrame.src = url;
  downloadBtn.href = url;
}

closeViewer.onclick = () => {
  viewer.style.display = "none";
  viewerFrame.src = "";
};

loadFiles();
