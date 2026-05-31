const msg = document.getElementById("msg");

function showMessage(text, color = "#00e7ff") {
    msg.innerHTML = text;
    msg.style.color = color;
}

async function createAccount() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (!email || !password) {

        showMessage(
            "Enter Email and Password",
            "red"
        );

        return;
    }

    if (password.length < 6) {

        showMessage(
            "Password must be at least 6 characters",
            "red"
        );

        return;
    }

    const { data, error } =
        await supabaseClient.auth.signUp({
            email,
            password
        });

    if (error) {

        console.log(error);

        showMessage(
            error.message,
            "red"
        );

        return;
    }

    showMessage(
        "Account Created Successfully ✅",
        "lime"
    );
}

async function login() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const { error } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

    if (error) {

        console.log(error);

        showMessage(
            error.message,
            "red"
        );

        return;
    }

    location.href =
        "profile.html";
}

async function forgetPassword() {

    const email =
        document.getElementById("email").value.trim();

    if (!email) {

        showMessage(
            "Enter Email First",
            "red"
        );

        return;
    }

    const { error } =
        await supabaseClient.auth.resetPasswordForEmail(
            email,
            {
                redirectTo:
                    "https://forensicbuzz.com/reset-password.html"
            }
        );

    if (error) {

        showMessage(
            error.message,
            "red"
        );

        return;
    }

    showMessage(
        "Password Reset Email Sent ✅",
        "lime"
    );
}
