async function pay(days) {

    try {

        const {
            data: userData
        }
            =
            await supabaseClient
                .auth
                .getUser();

        if (
            !userData.user
        ) {

            location =
                "login.html";

            return;

        }


        const amount =
            days === 1
                ?
                200
                :
                14900;


        const options = {

            key:
                "rzp_live_StqyfGl52TIJj7",

            amount,

            currency:
                "INR",

            name:
                "ForensicBuzz",

            description:
                days + " Day Plan",

            handler:
                async function (response) {

                    const end =
                        new Date();

                    end.setDate(
                        end.getDate()
                        +
                        days
                    );


                    await supabaseClient

                        .from(
                            "subscriptions"
                        )

                        .upsert({

                            email:
                                userData.user.email,

                            plan:
                                days + " Day",

                            active:
                                true,

                            start_date:
                                new Date(),

                            end_date:
                                end

                        });


                    alert(
                        "Payment Success"
                    );


                    location =
                        "profile.html";

                },


            modal: {

                ondismiss() {

                    alert(
                        "Payment Cancelled"
                    );

                }

            }


        };


        const rzp =
            new Razorpay(
                options
            );

        rzp.open();

    }

    catch (e) {

        console.log(e);

        alert(
            "Payment Failed"
        );

    }

}
