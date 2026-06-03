async function pay(days) {

    try {

        const { data: userData, error: userError } =
            await supabaseClient.auth.getUser();

        if (userError || !userData.user) {
            alert("Please Login First");
            location.href = "login.html";
            return;
        }

        const amount =
            days === 1 ? 1000 : 14900;

        const options = {

            key: "rzp_live_StqyfGl52TIJj7",

            amount: amount,

            currency: "INR",

            name: "ForensicBuzz",

            description: days + " Day Plan",

            handler: async function (response) {

                try {

                    console.log("PAYMENT SUCCESS");
                    console.log(response);

                    const userId = userData.user.id;

                    const startDate = new Date();

                    const endDate = new Date();
                    endDate.setDate(
                        endDate.getDate() + days
                    );

                    const { data, error } =
                        await supabaseClient
                            .from("subscriptions")
                            .insert([{
                                user_id: userId,
                                start_date: startDate.toISOString(),
                                end_date: endDate.toISOString(),
                                active: true,
                                plan_name: days + " Day"
                            }])
                            .select();

                    console.log("SUBSCRIPTION DATA:", data);
                    console.log("SUBSCRIPTION ERROR:", error);

                    if (error) {
                        alert("Subscription Save Failed");
                        console.log(error);
                        return;
                    }

                    alert("Payment Success");

                    window.location.href =
                        "profile.html?refresh=" +
                        Date.now();

                } catch (err) {

                    console.log(err);

                    alert(
                        "Database Save Error"
                    );

                }

            },

            modal: {

                ondismiss: function () {

                    alert(
                        "Payment Cancelled"
                    );

                }

            }

        };

        const rzp =
            new Razorpay(options);

        rzp.open();

    }

    catch (e) {

        console.log(e);

        alert(
            "Payment Failed"
        );

    }

}
