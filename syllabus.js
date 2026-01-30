/* 🔐 SUPABASE CONFIG */
const supabaseUrl = "https://bmmntjsxwufeuvfozkst.supabase.co";
const supabaseKey = "sb_publishable_RiIZNtQDpXve8h6d1ajrFA_xienSBVl";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

/* ✅ EXACT BUCKET NAME */
const bucket = "syllabus.image";

const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

/* 🔹 Filename → Topic */
function formatTitle(name) {
  return name
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

/* 🔹 FORCE DOWNLOAD (JS) */
function forceDownload(url, filename) {
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
    });
}

/* 🔹 LOAD FILES */
async function loadFiles() {
  const { data, error } = await supabase.storage.from(bucket).list();
  if (error) return console.error(error);

  gallery.innerHTML = "";

  data.forEach(file => {
    const ext = file.name.split(".").pop().toLowerCase();
    const title = formatTitle(file.name);
    const url =
      supabase.storage.from(bucket).getPublicUrl(file.name).data.publicUrl;

    const card = document.createElement("div");
    card.className = "card";

    if (ext === "pdf") {
      card.innerHTML = `
        <div class="topic">${title}</div>
        <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
             onclick="openPDF('${url}')">
        <button onclick="forceDownload('${url}','${file.name}')">
          Download PDF
        </button>
      `;
    } else {
      card.innerHTML = `
        <div class="topic">${title}</div>
        <img src="${url}" onclick="openImage('${url}')">
        <button onclick="forceDownload('${url}','${file.name}')">
          Download Image
        </button>
      `;
    }

    gallery.appendChild(card);
  });
}

/* 🔹 VIEWERS */
function openImage(url) {
  modal.style.display = "flex";
  modalContent.innerHTML = `<img src="${url}">`;
}

function openPDF(url) {
  modal.style.display = "flex";
  modalContent.innerHTML = `<iframe src="${url}"></iframe>`;
}

/* 🔹 CLOSE MODAL */
closeModal.onclick = () => {
  modal.style.display = "none";
  modalContent.innerHTML = "";
};

/* 🔹 INIT */
loadFiles();
