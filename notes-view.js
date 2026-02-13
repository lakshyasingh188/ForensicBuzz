const supabaseUrl = "https://bmmmtjsxwufeuvfozkst.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbW10anN4d3VmZXV2Zm96a3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNTYyODQsImV4cCI6MjA4NDgzMjI4NH0.btRW1CHoUbJodnXyvoUdji32dbwJW92mQOMXn7jVckM";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

async function loadSingleNote() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const { data, error } = await client
        .from("notes")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.log("Error:", error);
        return;
    }

    document.getElementById("noteTitle").innerText = data.title;
    document.getElementById("noteContent").innerText = data.content;
}

loadSingleNote();
