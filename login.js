const msg =
    document.getElementById("msg");


async function createAccount() {

    const email =
        document
            .getElementById(
                "email"
            )
            .value
            .trim();


    const password =
        document
            .getElementById(
                "password"
            )
            .value
            .trim();


    const {
        data,
        error
    }
        =
        await supabaseClient
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
        "Account Created";

}



async function login() {


    const email =
        document
            .getElementById(
                "email"
            )
            .value
            .trim();


    const password =
        document
            .getElementById(
                "password"
            )
            .value
            .trim();


    const {
        error
    }
        =
        await supabaseClient
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


    location =
        "profile.html";

}



async function forgetPassword() {


    const email =
        document
            .getElementById(
                "email"
            )
            .value
            .trim();


    const {
        error
    }
        =
        await
            supabaseClient
                .auth
                .resetPasswordForEmail(
                    email
                );


    if (error) {

        msg.innerHTML =
            error.message;

        return;

    }


    msg.innerHTML =
        "Reset email sent";

}