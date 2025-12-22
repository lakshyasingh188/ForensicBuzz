import { db } from "./firebase.js";
import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

/* ================= NOTES ================= */
window.saveNotes = async function () {

    await addDoc(collection(db, "notes"), {
        text: noteText.value || "",
        createdAt: Date.now()
    });

    alert("Notes saved ✅");
    noteText.value = "";
};

/* ================= MCQ ================= */
window.saveMCQ = async function () {

    await addDoc(collection(db, "daily_mcqs"), {
        question: question.value,
        options: [a.value, b.value, c.value, d.value],
        answer: answer.value,
        note: mcqNote.value,
        createdAt: Date.now()
    });

    alert("MCQ saved ✅");

    question.value = "";
    a.value = b.value = c.value = d.value = "";
    answer.value = "";
    mcqNote.value = "";
};

/* ================= QUIZ ================= */
window.saveQuiz = async function () {

    await addDoc(collection(db, "quizzes"), {
        content: quizText.value,
        createdAt: Date.now()
    });

    alert("Quiz content saved ✅");
    quizText.value = "";
};
