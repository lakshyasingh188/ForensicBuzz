async function check() {

    const {
        data: userData
    }
        =
        await db
            .auth
            .getUser();

    if (
        !userData.user
    ) {

        location.href =
            "login.html";

        return;

    }

    const {

        data

    }

        =
        await db

            .from(
                "subscriptions"
            )

            .select("*")

            .eq(

                "user_id",

                userData.user.id

            )

            .eq(

                "active",

                true

            )

            .single();

    if (data) {

        location.href =
            "mc.html";

    }

    else {

        location.href =
            "plans.html";

    }

}

check();