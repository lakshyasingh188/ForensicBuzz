async function init() {

    const {
        data
    }
        =
        await db
            .auth
            .getUser();

    if (
        !data.user
    ) {

        location.href =
            "login.html";

        return;

    }

    document
        .getElementById(
            "email"
        )
        .innerHTML =

        data.user.email;

}

init();

function openMock() {

    location.href =

        "subscription-check.html";

}

async function logout() {

    await db
        .auth
        .signOut();

    location.href =

        "login.html";

}