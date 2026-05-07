const SUPABASE_URL = "https://bmmmtjsxwufeuvfozkst.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbW10anN4d3VmZXV2Zm96a3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNTYyODQsImV4cCI6MjA4NDgzMjI4NH0.btRW1CHoUbJodnXyvoUdji32dbwJW92mQOMXn7jVckM";

const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const unitSelect = document.getElementById("unitSelect");
const questionContainer = document.getElementById("questionContainer");

/* LOAD UNITS */

async function loadUnits() {

    const { data, error } = await client
        .from("mock_questions")
        .select("unit");

    if (error) {
        console.log(error);
        return;
    }

    console.log(data);

    const uniqueUnits = [...new Set(data.map(item => item.unit))];

    uniqueUnits.forEach(unit => {

        const option = document.createElement("option");

        option.value = unit;
        option.textContent = unit;

        unitSelect.appendChild(option);

    });

}

loadUnits();

/* UNIT CHANGE */

unitSelect.addEventListener("change", async () => {

    const selectedUnit = unitSelect.value;

    questionContainer.innerHTML = "";

    const { data, error } = await client
        .from("mock_questions")
        .select("*")
        .eq("unit", selectedUnit);

    if (error) {
        console.log(error);
        return;
    }

    console.log(data);

    data.forEach((q, index) => {

        const div = document.createElement("div");

        div.classList.add("question-box");

        div.innerHTML = `

            <h3>
                Q${index + 1}. ${q.question}
            </h3>

            <div class="option" data-answer="A">
                A. ${q.option_a}
            </div>

            <div class="option" data-answer="B">
                B. ${q.option_b}
            </div>

            <div class="option" data-answer="C">
                C. ${q.option_c}
            </div>

            <div class="option" data-answer="D">
                D. ${q.option_d}
            </div>

            <div class="explanation">
                <b>Explanation:</b><br><br>
                ${q.explanation}
            </div>

        `;

        const options = div.querySelectorAll(".option");

        options.forEach(option => {

            option.addEventListener("click", () => {

                /* STOP MULTIPLE CLICK */

                options.forEach(op => {
                    op.style.pointerEvents = "none";
                });

                const selected = option.dataset.answer;

                /* CORRECT */

                if (selected === q.correct_answer) {

                    option.classList.add("correct");

                }

                /* WRONG */

                else {

                    option.classList.add("wrong");

                    options.forEach(op => {

                        if (op.dataset.answer === q.correct_answer) {

                            op.classList.add("correct");

                        }

                    });

                }

                /* SHOW EXPLANATION */

                div.querySelector(".explanation").style.display = "block";

            });

        });

        questionContainer.appendChild(div);

    });

});