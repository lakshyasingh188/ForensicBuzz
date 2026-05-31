const supabaseClient = window.supabaseClient;

if (!supabaseClient) {
    alert("Supabase Not Connected");
    throw new Error("supabaseClient not found");
}

const unitSelect = document.getElementById("unitSelect");
const questionContainer = document.getElementById("questionContainer");

// Check Subscription
async function checkSubscription() {

    try {

        const {
            data: authData,
            error: authError
        } = await supabaseClient.auth.getUser();

        if (authError || !authData.user) {

            alert("Please Login First");
            location.href = "login.html";
            return;
        }

        const userId = authData.user.id;

        console.log("User ID:", userId);

        const {
            data: subscriptions,
            error: subError
        } = await supabaseClient
            .from("subscriptions")
            .select("*")
            .eq("user_id", userId);

        console.log("Subscriptions:", subscriptions);
        console.log("Subscription Error:", subError);

        if (subError) {

            alert("Database Error");
            console.log(subError);
            return;
        }

        if (!subscriptions || subscriptions.length === 0) {

            alert("Subscription Required");
            location.href = "plans.html";
            return;
        }

        const subscription = subscriptions[0];

        const today = new Date();
        const expiry = new Date(subscription.end_date);

        console.log("Expiry:", expiry);

        if (expiry < today) {

            alert("Subscription Expired");
            location.href = "plans.html";
            return;
        }

        // Hide Loader
        document.getElementById("loader").style.display = "none";

        // Show App
        document.getElementById("app").style.display = "block";

        loadUnits();

    }

    catch (err) {

        console.error("FULL ERROR:", err);

        alert(
            "Access Error: " +
            (err.message || "Unknown Error")
        );
    }
}

// Load Units
async function loadUnits() {

    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("mock_questions")
            .select("unit");

        if (error) {

            console.log(error);
            alert("Question Table Error");
            return;
        }

        const uniqueUnits =
            [...new Set(data.map(item => item.unit))];

        unitSelect.innerHTML =
            '<option value="">Select Unit</option>';

        uniqueUnits.forEach(unit => {

            const option =
                document.createElement("option");

            option.value = unit;
            option.textContent = unit;

            unitSelect.appendChild(option);
        });

    }

    catch (err) {

        console.log(err);
    }
}

// Unit Change
unitSelect.addEventListener("change", async () => {

    const selectedUnit = unitSelect.value;

    if (!selectedUnit) return;

    questionContainer.innerHTML = "";

    try {

        const {
            data,
            error
        } = await supabaseClient
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

            div.className = "question-box";

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

                    div.querySelector(".explanation")
                        .style.display = "block";
                });
            });

            questionContainer.appendChild(div);
        });

    }

    catch (err) {

        console.log(err);
    }
});

checkSubscription();
