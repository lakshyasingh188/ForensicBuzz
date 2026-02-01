// 🔑 Supabase config
const SUPABASE_URL = "https://bmmmtjsxwufeuvfozkst.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbW10anN4d3VmZXV2Zm96a3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNTYyODQsImV4cCI6MjA4NDgzMjI4NH0.btRW1CHoUbJodnXyvoUdji32dbwJW92mQOMXn7jVckM";

// ❗ IMPORTANT: supabase sirf EK BAAR declare
const sb = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const booksList = document.getElementById("books-list");

// 📚 Load books
async function loadBooks() {
  booksList.innerHTML = "Loading books...";

  const { data, error } = await sb
    .from("books")
    .select("*");

  if (error) {
    console.error(error);
    booksList.innerHTML = "Error loading books";
    return;
  }

  if (!data || data.length === 0) {
    booksList.innerHTML = "No books found";
    return;
  }

  booksList.innerHTML = "";

  data.forEach(book => {
    const div = document.createElement("div");
    div.className = "book-card";
    div.innerHTML = `<h3>${book.title}</h3>`;
    div.onclick = () => openBook(book.file_path);
    booksList.appendChild(div);
  });
}

// 📖 Open book
function openBook(path) {
  const { data } = sb
    .storage
    .from("books")
    .getPublicUrl(path);

  window.open(data.publicUrl, "_blank");
}

// 🚀 Start
loadBooks();
