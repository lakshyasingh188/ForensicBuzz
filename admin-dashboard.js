import { db, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// 🔐 protect dashboard
onAuthStateChanged(auth, user => {
  if (!user) location.href = "admin-login.html";
});

// 🔹 ADD TOPIC
window.addTopic = async function () {
  await addDoc(collection(db, "topics"), {
    title: topicTitle.value,
    desc: topicDesc.value,
    createdAt: Date.now()
  });
  alert("Topic saved to Firebase");
  location.reload();
};

// 🔹 LOAD TOPICS (admin dropdown)
async function loadTopics() {
  const snap = await getDocs(collection(db, "topics"));
  topicSelect.innerHTML = "";
  snap.forEach(d => {
    topicSelect.innerHTML += `
      <option value="${d.id}">${d.data().title}</option>
    `;
  });
}
loadTopics();

// 🔹 ADD MCQ
window.addMCQ = async function () {
  await addDoc(collection(db, "mcqs"), {
    topicId: topicSelect.value,
    question: q.value,
    a: a.value,
    b: b.value,
    c: c.value,
    d: d.value,
    createdAt: Date.now()
  });
  alert("MCQ saved to Firebase");
};

// 🔹 DELETE MCQ (admin. only)
window.deleteMCQ = async function (id) {
  if (confirm("Delete this MCQ?")) {
    await deleteDoc(doc(db, "mcqs", id));
    alert("MCQ deleted");
    location.reload();
  }
};
