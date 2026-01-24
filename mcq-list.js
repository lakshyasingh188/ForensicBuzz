import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const topicId = new URLSearchParams(location.search).get("topic");
const box = document.getElementById("mcqList");

const q = query(
  collection(db, "mcqs"),
  where("topicId", "==", topicId)
);

const snap = await getDocs(q);

if (snap.empty) {
  box.innerHTML = "<p>No MCQs found</p>";
}

let i = 1;
snap.forEach(d => {
  const m = d.data();
  box.innerHTML += `
    <div class="mcq">
      <p><b>Q${i++}.</b> ${m.question}</p>
      <ul>
        <li>${m.a}</li>
        <li>${m.b}</li>
        <li>${m.c}</li>
        <li>${m.d}</li>
      </ul>
    </div>
    <hr>
  `;
});
