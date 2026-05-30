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
                9900;


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

            handler: async function (response) {

                const end = new Date();

                end.setDate(
                    end.getDate() + days
                );

                const { data: sessionData } =
                    await supabaseClient.auth.getUser();

                const userId =
                    sessionData.user.id;

                const { error } =
                    await supabaseClient
                        .from("subscriptions")
                        .upsert({
                            user_id: userId,
                            start_date: new Date(),
                            end_date: end,
                            active: true,
                            plan_name: days + " Day"
                        });

                if (error) {
                    console.log(error);
                    alert("Subscription Save Failed");
                    return;
                }

                alert("Payment Success");

                location.href =
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
