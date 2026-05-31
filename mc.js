const unitSelect = document.getElementById("unitSelect");
const questionContainer = document.getElementById("questionContainer");

async function checkSubscription() {

    try {

        const { data: authData, error: authError } =
            await supabaseClient.auth.getUser();

        if (authError || !authData.user) {

            alert("Please Login First");

            location.href = "login.html";

            return;
        }

        const userId = authData.user.id;

        const { data: subscription, error } =
            await supabaseClient
                .from("subscriptions")
                .select("*")
                .eq("user_id", userId)
                .eq("active", true)
                .single();

        console.log("USER =", authData.user);
        console.log("SUB =", subscription);
        console.log("ERROR =", error);

        if (!subscription) {

            alert("Subscription Required");

            location.href = "plans.html";

            return;
        }

        const today = new Date();
        const expiry = new Date(subscription.end_date);

        if (expiry < today) {

            alert("Subscription Expired");

            location.href = "plans.html";

            return;
        }

        loadUnits();

    }

    catch (err) {

        console.log(err);

        alert("Subscription Check Failed");
    }
}

async function loadUnits() {

    const { data, error } =
        await supabaseClient
            .from("mock_questions")
            .select("unit");

    if (error) {

        console.log(error);

        return;
    }

    const uniqueUnits =
        [...new Set(data.map(x => x.unit))];

    unitSelect.innerHTML =
        "<option>Select Unit</option>";

    uniqueUnits.forEach(unit => {

        const option =
            document.createElement("option");

        option.value = unit;
        option.textContent = unit;

        unitSelect.appendChild(option);
    });
}

unitSelect.addEventListener("change", async () => {

    const selectedUnit = unitSelect.value;

    if (
        selectedUnit === "Select Unit"
    ) return;

    questionContainer.innerHTML = "";

    const { data, error } =
        await supabaseClient
            .from("mock_questions")
            .select("*")
            .eq("unit", selectedUnit);

    if (error) {

        console.log(error);

        return;
    }

    data.forEach((q, index) => {

        const div =
            document.createElement("div");

        div.className =
            "question-box";

        div.innerHTML = `
            <h3>Q${index + 1}. ${q.question}</h3>

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

            <div class="explanation" style="display:none;">
                <b>Explanation:</b><br><br>
                ${q.explanation}
            </div>
        `;

        const options =
            div.querySelectorAll(".option");

        options.forEach(option => {

            option.addEventListener("click", () => {

                options.forEach(op => {
                    op.style.pointerEvents = "none";
                });

                if (
                    option.dataset.answer ===
                    q.correct_answer
                ) {

                    option.classList.add("correct");

                } else {

                    option.classList.add("wrong");

                    options.forEach(op => {

                        if (
                            op.dataset.answer ===
                            q.correct_answer
                        ) {
                            op.classList.add("correct");
                        }
                    });
                }

                div.querySelector(
                    ".explanation"
                ).style.display = "block";
            });
        });

        questionContainer.appendChild(div);
    });
});

checkSubscription();
