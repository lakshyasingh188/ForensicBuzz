import { db } from "./firebase.js";
import { collection, addDoc }
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

window.saveMCQ = async function () {

  const today = new Date().toISOString().split("T")[0];

  await addDoc(collection(db, "daily_mcqs"), {
    date: today,
    question: question.value,
    options: [a.value, b.value, c.value, d.value],
    answer: answer.value,
    note: note.value,
    createdAt: Date.now()
  });

  alert("MCQ Added Successfully ✅");

  question.value = "";
  a.value = b.value = c.value = d.value = "";
  answer.value = "";
  note.value = "";
};
