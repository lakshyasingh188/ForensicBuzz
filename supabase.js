const SUPABASE_URL =
  "https://bmmmtjsxwufeuvfozkst.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbW10anN4d3VmZXV2Zm96a3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNTYyODQsImV4cCI6MjA4NDgzMjI4NH0.btRW1CHoUbJodnXyvoUdji32dbwJW92mQOMXn7jVckM";

window.supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

console.log("Supabase Connected");
