// =======================================
// FORENSICBUZZ TEST SERIES v2
// PART 1
// =======================================

// =======================================
// SUPABASE CONFIG
// =======================================

const SUPABASE_URL = "https://bmmmtjsxwufeuvfozkst.supabase.co";

const SUPABASE_ANON_KEY =
"YOUR_SUPABASE_ANON_KEY";

const supabaseClient =
supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);

// =======================================
// RAZORPAY
// =======================================

const RAZORPAY_KEY =
"rzp_live_xxxxxxxxxxxxx";

// =======================================
// TEST SERIES
// =======================================

const testSeries = [

{

code:"BIO001",

title:"Forensic Biology Test 01",

category:"Biology",

price:9,

questions:100,

pages:42,

cover:"biology.jpeg",

sample:"biology-sample.pdf",

full:"biology-full.pdf",

description:"Latest Biology Mock Test."

},

{

code:"BIO002",

title:"Forensic Biology Test 02",

category:"Biology",

price:49,

questions:200,

pages:85,

cover:"biology2.jpg",

sample:"biology2-sample.pdf",

full:"biology2-full.pdf",

description:"Advanced Biology Practice Set."

},

{

code:"CHE001",

title:"Forensic Chemistry Test",

category:"Chemistry",

price:49,

questions:150,

pages:65,

cover:"chemistry.jpg",

sample:"chemistry-sample.pdf",

full:"chemistry-full.pdf",

description:"Latest Chemistry Mock Test."

},

{

code:"DNA001",

title:"DNA Complete Test",

category:"DNA",

price:99,

questions:250,

pages:120,

cover:"dna.jpg",

sample:"dna-sample.pdf",

full:"dna-full.pdf",

description:"Complete DNA Practice Set."

}

];

// =======================================
// ELEMENTS
// =======================================

const container =
document.getElementById("testContainer");

const loading =
document.getElementById("loadingScreen");

const modal =
document.getElementById("previewModal");

const frame =
document.getElementById("previewFrame");

const previewTitle =
document.getElementById("previewTitle");

const closeBtn =
document.querySelector(".close");

let currentTest = null;

// =======================================
// LOAD CARDS
// =======================================

function loadCards(data){

container.innerHTML="";

data.forEach(test=>{

container.innerHTML+=`

<div class="test-card">

<div class="card-image">

<img
src="${SUPABASE_URL}/storage/v1/object/public/test-cover/${test.cover}"
alt="${test.title}">

<div class="price-tag">

₹${test.price}

</div>

</div>

<div class="card-body">

<h2>${test.title}</h2>

<p>

${test.description}

</p>

<div class="info-box">

<div class="info">

<h3>${test.questions}</h3>

<span>Questions</span>

</div>

<div class="info">

<h3>${test.pages}</h3>

<span>Pages</span>

</div>

</div>

<div class="card-buttons">

<button
class="preview-btn"
onclick="previewPDF('${test.code}')">

Preview

</button>

<button
class="buy-btn"
id="buy-${test.code}"
onclick="buyNow('${test.code}')">

Unlock ₹${test.price}

</button>

</div>

</div>

</div>

`;

});

}

// =======================================
// WINDOW LOAD
// =======================================

window.onload=function(){

loadCards(testSeries);

setTimeout(()=>{

loading.style.display="none";

},800);

};
// =======================================
// SEARCH
// =======================================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = testSeries.filter(test =>

        test.title.toLowerCase().includes(value) ||

        test.category.toLowerCase().includes(value) ||

        test.description.toLowerCase().includes(value)

    );

    loadCards(filtered);

});

// =======================================
// CATEGORY FILTER
// =======================================

const categoryButtons =
document.querySelectorAll(".category");

categoryButtons.forEach(button=>{

button.addEventListener("click",()=>{

categoryButtons.forEach(btn=>
btn.classList.remove("active")
);

button.classList.add("active");

const category=button.innerText;

if(category==="All"){

loadCards(testSeries);

return;

}

const filtered=testSeries.filter(test=>

test.category===category

);

loadCards(filtered);

});

});

// =======================================
// PREVIEW PDF
// =======================================

function previewPDF(code){

const test=testSeries.find(

item=>item.code===code

);

currentTest=test;

previewTitle.innerHTML=test.title;

frame.src=
`${SUPABASE_URL}/storage/v1/object/public/sample-pdf/${test.sample}`;

modal.style.display="flex";

}

// =======================================
// CLOSE MODAL
// =======================================

closeBtn.onclick=function(){

modal.style.display="none";

frame.src="";

};

window.onclick=function(e){

if(e.target===modal){

modal.style.display="none";

frame.src="";

}

};

// =======================================
// CHANGE BUTTON AFTER PAYMENT
// =======================================

function showDownloadButton(test,downloadUrl){

const btn=
document.getElementById(`buy-${test.code}`);

btn.innerHTML=`
<i class="fa-solid fa-download"></i>
Download PDF
`;

btn.classList.remove("buy-btn");

btn.classList.add("download-btn");

btn.onclick=function(){

window.open(downloadUrl,"_blank");

};

}
// =======================================
// BUY NOW
// =======================================

async function buyNow(code) {

    const test = testSeries.find(t => t.code === code);

    if (!test) {
        alert("Test Series not found.");
        return;
    }

    try {

        // Create Razorpay Order
        const orderResponse = await fetch("/api/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: test.price,
                testCode: test.code,
                title: test.title
            })
        });

        const order = await orderResponse.json();

        if (!order.success) {
            alert(order.message || "Unable to create order.");
            return;
        }

        const options = {

            key: order.key,

            amount: order.amount,

            currency: order.currency,

            name: "ForensicBuzz",

            description: test.title,

            order_id: order.orderId,

            handler: async function (response) {

                const verifyResponse = await fetch("/api/verify-payment", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        razorpay_order_id: response.razorpay_order_id,

                        razorpay_payment_id: response.razorpay_payment_id,

                        razorpay_signature: response.razorpay_signature,

                        test_code: test.code,

                        amount: test.price

                    })

                });

                const verify = await verifyResponse.json();

                if (!verify.success) {

                    alert(verify.message || "Payment verification failed.");

                    return;

                }

                showDownloadButton(
                    test,
                    verify.downloadUrl
                );

                alert("Payment Successful!");

            },

            theme: {
                color: "#0f62fe"
            }

        };

        const razorpay = new Razorpay(options);

        razorpay.open();

    } catch (err) {

        console.error(err);

        alert("Something went wrong.");

    }

}
