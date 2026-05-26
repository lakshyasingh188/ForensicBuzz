async function loadProfile() {

    try {

        const {

            data,

            error

        }

            =

            await supabaseClient

                .auth

                .getUser();


        if (

            error ||

            !data.user

        ) {

            location.replace(

                "login.html"

            );

            return;

        }


        const email =

            data.user.email;


        document

            .getElementById(

                "email"

            )

            .innerHTML =

            "Email : " + email;



        const {

            data: sub

        }

            =

            await supabaseClient

                .from(

                    "subscriptions"

                )

                .select("*")

                .eq(

                    "email",

                    email

                )

                .single();



        if (

            sub &&

            sub.active &&

            new Date(

                sub.end_date

            )

            >

            new Date()

        ) {

            document

                .getElementById(

                    "status"

                )

                .innerHTML =

                "Subscription Active ✅";


            document

                .getElementById(

                    "mockBtn"

                )

                .style.display =

                "block";

        }

        else {

            document

                .getElementById(

                    "status"

                )

                .innerHTML =

                "No Active Subscription";

        }


    }

    catch (e) {

        console.log(e);

        alert(

            "Profile Error"

        );

    }

}


loadProfile();



function buy() {

    location =

        "plans.html";

}



function openMock() {

    location =

        "mc.html";

}



async function logout() {

    await supabaseClient

        .auth

        .signOut();

    location =

        "login.html";

}