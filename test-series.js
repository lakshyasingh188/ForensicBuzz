// =======================================
// ForensicBuzz Test Series
// Part 1
// =======================================

// ----------------------
// Test Series Data
// ----------------------

const testSeries = [

{

code:"BIO001",

title:"Forensic Biology Test 01",

category:"Biology",

price:9,

questions:100,

pages:42,

image:"biology.jpeg",

sample:"biology-sample.pdf",

full:"biology-sample.pdf",

description:"Latest Biology Mock Test based on New Pattern."

},

{

code:"BIO002",

title:"Forensic Biology Test 02",

category:"Biology",

price:49,

questions:200,

pages:85,

image:"images/biology2.jpg",

sample:"biology2-sample.pdf",

full:"biology2-full.pdf",

description:"Advanced Biology Practice Set."

},

{

code:"CHE001",

title:"Forensic Chemistry Test 01",

category:"Chemistry",

price:49,

questions:150,

pages:65,

image:"images/chemistry.jpg",

sample:"chemistry-sample.pdf",

full:"chemistry-full.pdf",

description:"Important Chemistry Questions."

},

{

code:"DNA001",

title:"DNA Test Series",

category:"DNA",

price:99,

questions:250,

pages:120,

image:"images/dna.jpg",

sample:"dna-sample.pdf",

full:"dna-full.pdf",

description:"Complete DNA Practice Book."

}

];

// ----------------------
// Elements
// ----------------------

const container=document.getElementById("testContainer");

const loading=document.getElementById("loadingScreen");

// ----------------------
// Card Generator
// ----------------------

function loadCards(data){

container.innerHTML="";

data.forEach(test=>{

container.innerHTML+=`

<div class="test-card">

<div class="card-image">

<img src="${SUPABASE_URL}/storage/v1/object/public/test-cover/${test.cover}" alt="${test.title}">
<div class="price-tag">

₹${test.price}

</div>

</div>

<div class="card-body">

<h2>${test.title}</h2>

<p class="card-desc">

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

onclick="buyNow('${test.code}')">

Unlock ₹${test.price}

</button>

</div>

</div>

</div>

`;

});

}

// ----------------------
// Loading Screen
// ----------------------

window.onload=()=>{

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

const categoryButtons = document.querySelectorAll(".category");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category = button.innerText;

        if (category === "All") {

            loadCards(testSeries);

            return;

        }

        const filtered = testSeries.filter(test =>
            test.category === category
        );

        loadCards(filtered);

    });

});


// =======================================
// PREVIEW MODAL
// =======================================

const modal = document.getElementById("previewModal");

const frame = document.getElementById("previewFrame");

const title = document.getElementById("previewTitle");

const closeBtn = document.querySelector(".close");

let currentTest = null;

function previewPDF(code){

    const test = testSeries.find(item => item.code === code);

    currentTest = test;

    title.innerHTML = test.title;

    // Sample PDF
    // Abhi local folder se
    // Baad me Supabase se aayega

frame.src = `${SUPABASE_URL}/storage/v1/object/public/sample-pdf/${test.sample}`;
    modal.style.display = "flex";

}

closeBtn.onclick = () => {

    modal.style.display = "none";

    frame.src = "";

}

window.onclick = (e)=>{

    if(e.target==modal){

        modal.style.display="none";

        frame.src="";

    }

}


// =======================================
// BUY BUTTON
// =======================================

function buyNow(code){

    const test = testSeries.find(item => item.code === code);

    currentTest = test;

    alert(

`Payment Screen

Test : ${test.title}

Price : ₹${test.price}

Next Step :
Razorpay Open`

    );

}
// =======================================
// SUPABASE CONFIG
// =======================================

// Apni values yahan paste karna
const SUPABASE_URL = "https://bmmmtjsxwufeuvfozkst.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbW10anN4d3VmZXV2Zm96a3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNTYyODQsImV4cCI6MjA4NDgzMjI4NH0.btRW1CHoUbJodnXyvoUdji32dbwJW92mQOMXn7jVckM";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// =======================================
// RAZORPAY KEY
// =======================================

const RAZORPAY_KEY = "YOUR_RAZORPAY_KEY";

// =======================================
// LOGIN CHECK
// =======================================

async function getCurrentUser(){

    const { data } = await supabaseClient.auth.getUser();

    return data.user;

}

// =======================================
// PURCHASE CHECK
// =======================================

async function alreadyPurchased(testCode){

    const user = await getCurrentUser();

    if(!user){

        return false;

    }

    const { data } = await supabaseClient
    .from("test_purchases")
    .select("*")
    .eq("user_id",user.id)
    .eq("test_code",testCode)
    .eq("status","paid")
    .maybeSingle();

    return !!data;

}

// =======================================
// BUY NOW
// =======================================

async function buyNow(code){

    const user = await getCurrentUser();

    if(!user){

        alert("Please login first.");

        return;

    }

    const test = testSeries.find(t=>t.code===code);

    if(await alreadyPurchased(code)){

        showDownloadButton(test);

        return;

    }

    const options={

        key:RAZORPAY_KEY,

        amount:test.price*100,

        currency:"INR",

        name:"ForensicBuzz",

        description:test.title,

        handler:async function(response){

            await savePurchase(

                code,

                test.price,

                response.razorpay_payment_id

            );

            alert("Payment Successful");

            showDownloadButton(test);

        }

    };

    const rzp=new Razorpay(options);

    rzp.open();

}

// =======================================
// SAVE PURCHASE
// =======================================

async function savePurchase(code,amount,paymentId){

    const user=await getCurrentUser();

    await supabaseClient

    .from("test_purchases")

    .insert({

        user_id:user.id,

        test_code:code,

        amount:amount,

        payment_id:paymentId,

        status:"paid"

    });

}

// =======================================
// DOWNLOAD BUTTON
// =======================================

function showDownloadButton(test){

    document.getElementById("buyNowBtn").innerHTML="Download PDF";

    document.getElementById("buyNowBtn").onclick=function(){

        downloadPDF(test);

    };

}

// =======================================
// PRIVATE PDF DOWNLOAD
// =======================================

async function downloadPDF(test){

    const { data,error } = await supabaseClient.storage

    .from("full-pdf")

    .createSignedUrl(

        test.full,

        300

    );

    if(error){

        alert("Unable to download.");

        return;

    }

    window.open(data.signedUrl,"_blank");

}