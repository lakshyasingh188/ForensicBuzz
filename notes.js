const supabaseUrl = "https://bmmmtjsxwufeuvfozkst.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbW10anN4d3VmZXV2Zm96a3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNTYyODQsImV4cCI6MjA4NDgzMjI4NH0.btRW1CHoUbJodnXyvoUdji32dbwJW92mQOMXn7jVckM";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

async function loadNotes() {
    const { data, error } = await client
        .from("notes")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.log("Error:", error);
        return;
    }

    const container = document.getElementById("notesList");

    data.forEach(note => {
        const div = document.createElement("div");
        div.className = "note-card";
        div.innerHTML = `
            <h3 onclick="openNote(${note.id})">${note.title}</h3>
        `;
        container.appendChild(div);
    });
}

function openNote(id) {
    window.location.href = `note-view.html?id=${id}`;
}

loadNotes();

