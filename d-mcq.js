/*=========================================
      FORENSICBUZZ DAILY MCQ
          PART 3A-1
==========================================*/


//==============================
// SUPABASE CONFIG
//==============================

const SUPABASE_URL = "https://bmmmtjsxwufeuvfozkst.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbW10anN4d3VmZXV2Zm96a3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNTYyODQsImV4cCI6MjA4NDgzMjI4NH0.btRW1CHoUbJodnXyvoUdji32dbwJW92mQOMXn7jVckM";


//==============================
// VARIABLES
//==============================

let questions = [];

let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;

let timer = 300;

let timerInterval;


//==============================
// HTML ELEMENTS
//==============================

const question = document.getElementById("question");

const options = document.getElementById("options");

const submitBtn = document.getElementById("submitBtn");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

const result = document.getElementById("result");

const explanation = document.getElementById("explanation");

const explanationText = document.getElementById("explanationText");

const progressFill = document.getElementById("progressFill");

const timerBox = document.getElementById("timer");

const scoreBox = document.getElementById("score");

const questionImage = document.getElementById("questionImage");


//==============================
// LOAD QUESTIONS
//==============================

async function loadQuestions(){

try{

const response = await fetch(

`${SUPABASE_URL}/rest/v1/daily_mcqs?select=*&is_active=eq.true&order=id.asc`,

{

headers:{

apikey:SUPABASE_KEY,

Authorization:`Bearer ${SUPABASE_KEY}`

}

}

);

questions = await response.json();

console.log(questions);

if(questions.length==0){

question.innerHTML="No Daily MCQ Available";

return;

}

showQuestion();

startTimer();

}

catch(error){

console.log(error);

question.innerHTML="Unable to load questions.";

}

}



//==============================
// SHOW QUESTION
//==============================

function showQuestion(){

selectedAnswer=null;

result.innerHTML="";

explanation.style.display="none";

options.innerHTML="";

const q=questions[currentQuestion];

document.getElementById("currentQuestion").innerHTML=currentQuestion+1;

question.innerHTML=q.question;


//==============================
// IMAGE
//==============================

if(q.image_url){

questionImage.src=q.image_url;

questionImage.style.display="block";

}else{

questionImage.style.display="none";

}



//==============================
// OPTIONS
//==============================

const allOptions=[

{

letter:"A",

text:q.option_a

},

{

letter:"B",

text:q.option_b

},

{

letter:"C",

text:q.option_c

},

{

letter:"D",

text:q.option_d

}

];


allOptions.forEach(option=>{

const div=document.createElement("div");

div.className="option";

div.innerHTML=

`<strong>${option.letter}.</strong> ${option.text}`;

div.onclick=function(){

document.querySelectorAll(".option").forEach(el=>{

el.classList.remove("selected");

});

div.classList.add("selected");

selectedAnswer=option.letter;

};

options.appendChild(div);

});

updateProgress();

}



//==============================
// PROGRESS
//==============================

function updateProgress(){

const percent=((currentQuestion+1)/questions.length)*100;

progressFill.style.width=percent+"%";

}



//==============================
// TIMER
//==============================

function startTimer(){

clearInterval(timerInterval);

timer=300;

timerInterval=setInterval(()=>{

timer--;

let min=Math.floor(timer/60);

let sec=timer%60;

if(sec<10){

sec="0"+sec;

}

timerBox.innerHTML=min+":"+sec;

if(timer<=0){

clearInterval(timerInterval);

submitAnswer();

}

},1000);

}



//==============================
// SUBMIT
//==============================

submitBtn.onclick=function(){

submitAnswer();

};
//==============================
// SUBMIT ANSWER
//==============================

function submitAnswer(){

    if(selectedAnswer==null){

        alert("Please select an option.");

        return;

    }

    clearInterval(timerInterval);

    const q = questions[currentQuestion];

    const optionList = document.querySelectorAll(".option");

    const letters = ["A","B","C","D"];

    optionList.forEach((item,index)=>{

        item.style.pointerEvents="none";

        if(letters[index]===q.correct_option){

            item.classList.add("correct");

        }

        if(
            letters[index]===selectedAnswer &&
            selectedAnswer!==q.correct_option
        ){

            item.classList.add("wrong");

        }

    });

    if(selectedAnswer===q.correct_option){

        score++;

        result.innerHTML="✅ Correct Answer";

        result.style.color="#16a34a";

    }else{

        result.innerHTML=
        "❌ Wrong Answer<br>Correct Answer : "+q.correct_option;

        result.style.color="#dc2626";

    }

    scoreBox.innerHTML=score;

    explanation.style.display="block";

    explanationText.innerHTML=q.explanation || "No explanation available.";

}



//==============================
// NEXT QUESTION
//==============================

nextBtn.onclick = function () {

    // Agar answer select nahi kiya
    if (selectedAnswer == null) {

        alert("Please select an option first.");

        return;

    }

    // Answer automatic submit hoga
    submitAnswer();

    // 1 second baad next question
    setTimeout(() => {

        if (currentQuestion < questions.length - 1) {

            currentQuestion++;

            showQuestion();

            startTimer();

        } else {

            finishQuiz();

        }

    }, 1000);

};



//==============================
// PREVIOUS QUESTION
//==============================

prevBtn.onclick=function(){

    if(currentQuestion>0){

        currentQuestion--;

        showQuestion();

        startTimer();

    }

}



//==============================
// FINISH QUIZ
//==============================

function finishQuiz(){

    question.innerHTML="🎉 Quiz Completed";

    options.innerHTML="";

    submitBtn.style.display="none";

    nextBtn.style.display="none";

    prevBtn.style.display="none";

    explanation.style.display="none";

    result.innerHTML=`

        <h2>Your Score</h2>

        <br>

        <h1>${score} / ${questions.length}</h1>

        <br>

        <p>Thank you for practicing with ForensicBuzz.</p>

    `;

}



//==============================
// START APP
//==============================

loadQuestions();
