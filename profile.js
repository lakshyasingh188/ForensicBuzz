async function loadProfile() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.getUser();

        if (error || !data.user) {

            location.replace("login.html");
            return;

        }

        const user = data.user;

        document.getElementById("email").innerHTML =
            "Email : " + user.email;

        const {
            data: subscription,
            error: subError
        } =
            await supabaseClient
                .from("subscriptions")
                .select("*")
                .eq("user_id", user.id)
                .eq("active", true)
                .order("id", {
                    ascending: false
                })
                .limit(1)
                .single();

        console.log("Subscription:", subscription);
        console.log("Subscription Error:", subError);

        const status =
            document.getElementById("status");

        const mockBtn =
            document.getElementById("mockBtn");

        if (
            subscription &&
            new Date(subscription.end_date) >
            new Date()
        ) {

            status.innerHTML =
                `
                ✅ Active Plan : ${subscription.plan_name}
                <br>
                Valid Till :
                ${new Date(subscription.end_date).toLocaleDateString()}
                `;

            mockBtn.style.display =
                "block";

        }

        else {

            status.innerHTML =
                "❌ No Active Subscription";

            mockBtn.style.display =
                "none";

        }

    }

    catch (e) {

        console.log(e);

        alert("Profile Error");

    }

}

loadProfile();


function buy() {

    location.href =
        "plans.html";

}


function openMock() {

    location.href =
        "mc.html";

}


async function logout() {

    await supabaseClient
        .auth
        .signOut();

    location.href =
        "login.html";

}
