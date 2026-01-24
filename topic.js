import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const box = document.getElementById("topicCards");

const snap = await getDocs(collection(db, "topics"));

if (snap.empty) {
  box.innerHTML = "<p>No topics available</p>";
}

snap.forEach(docu => {
  const t = docu.data();
  box.innerHTML += `
    <div class="tool-card" onclick="openTopic('${docu.id}')">
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
    </div>
  `;
});

window.openTopic = function (id) {
  location.href = `mcq-list.html?topic=${id}`;
};
