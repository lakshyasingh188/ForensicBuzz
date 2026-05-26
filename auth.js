const msg =
    document.getElementById("msg");

const signupBtn =
    document.getElementById("signupBtn");

const loginBtn =
    document.getElementById("loginBtn");

/* GET INPUT */

function getValues() {

    return {

        email:
            document
                .getElementById("email")
                .value
                .trim(),

        password:
            document
                .getElementById("password")
                .value
                .trim()

    };

}

/* SIGNUP */

signupBtn.addEventListener(

    "click",

    async () => {

        try {

            const {
                email,
                password
            }
                =
                getValues();

            if (
                !email ||
                !password
            ) {

                msg.innerHTML =
                    "Enter email and password";

                return;

            }

            msg.innerHTML =
                "Creating account...";

            const {

                data,
                error

            }

                =
                await db
                    .auth
                    .signUp({

                        email,

                        password

                    });

            if (error) {

                msg.innerHTML =
                    error.message;

                return;

            }

            msg.innerHTML =
                "Account created successfully ✓";

            document
                .getElementById("password")
                .value = "";

        }

        catch (err) {

            console.log(err);

            msg.innerHTML =
                "Signup failed";

        }

    }

);

/* LOGIN */

loginBtn.addEventListener(

    "click",

    async () => {

        try {

            const {
                email,
                password
            }
                =
                getValues();

            if (
                !email ||
                !password
            ) {

                msg.innerHTML =
                    "Enter email and password";

                return;

            }

            msg.innerHTML =
                "Logging in...";

            const {

                data,
                error

            }

                =
                await db
                    .auth
                    .signInWithPassword({

                        email,

                        password

                    });

            if (error) {

                msg.innerHTML =
                    error.message;

                return;

            }

            msg.innerHTML =
                "Login Success ✓";

            setTimeout(() => {

                location.href =
                    "dashboard.html";

            }, 1000);

        }

        catch (err) {

            console.log(err);

            msg.innerHTML =
                "Login failed";

        }

    }

);
/* FORGOT PASSWORD */

const forgotBtn =
    document.getElementById(
        "forgotBtn"
    );

forgotBtn.addEventListener(

    "click",

    async () => {

        const email =
            document
                .getElementById("email")
                .value
                .trim();

        if (!email) {

            msg.innerHTML =
                "Enter email first";

            return;

        }

        msg.innerHTML =
            "Sending reset email...";

        const {
            error
        }
            =
            await db
                .auth
                .resetPasswordForEmail(

                    email,

                    {

                        redirectTo:

                            window.location.origin +

                            "/reset-password.html"

                    }

                );

        if (error) {

            msg.innerHTML =
                error.message;

            return;

        }

        msg.innerHTML =
            "Reset email sent ✓";

    }

);