import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy }
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const mcqList = document.getElementById("mcqList");

const q = query(
  collection(db, "daily_mcqs"),
  orderBy("createdAt", "desc")
);

const snapshot = await getDocs(q);
mcqList.innerHTML = "";

snapshot.forEach(doc => {
  const d = doc.data();
  mcqList.innerHTML += `
    <div>
      <p><b>${d.question}</b></p>
      <ul>
        <li>${d.options[0]}</li>
        <li>${d.options[1]}</li>
        <li>${d.options[2]}</li>
        <li>${d.options[3]}</li>
      </ul>
      <details>
        <summary>Show Answer & Notes</summary>
        <p><b>Answer:</b> ${d.answer}</p>
        <p><b>Notes:</b> ${d.note || "No notes"}</p>
      </details>
      <hr>
    </div>
  `;
});
