const mcqs = JSON.parse(localStorage.getItem("mcqs")) || [];
const box = document.getElementById("mcqsList");

if (mcqs.length === 0) {
  box.innerHTML = "<p>No MCQs available yet.</p>";
}

mcqs.forEach((m, i) => {
  box.innerHTML += `
    <div class="mcq">
      <p><b>Q${i + 1}.</b> ${m.q}</p>
      <ul>
        <li>${m.a}</li>
        <li>${m.b}</li>
        <li>${m.c}</li>
        <li>${m.d}</li>
      </ul>
    </div>
  `;
});
