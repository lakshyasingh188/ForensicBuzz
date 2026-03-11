import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://bmmmtjsxwufeuvfozkst.supabase.co";
const supabaseKey = "sb_publishable_RiIZNtQDpXve8h6d1ajrFA_xienSBVl";

const supabase = createClient(supabaseUrl, supabaseKey);

/* LOAD TOPICS */

async function loadTopics(){

const { data, error } = await supabase
.from("topics")
.select("*");

if(error){
console.log("Topic error",error);
return;
}

const container=document.getElementById("topics");
container.innerHTML="";

data.forEach(topic=>{

const topicName =
topic.topic_name ||
topic.name ||
topic.title ||
"Untitled Topic";

const card=document.createElement("div");
card.className="topic-card";

card.innerHTML=`<h3>${topicName}</h3>`;

card.onclick=()=>{
loadMCQs(topic.id);
};

container.appendChild(card);

});

}


/* LOAD MCQS */

async function loadMCQs(topicId){

const { data, error } = await supabase
.from("mcqs")
.select("*")
.eq("topic_id",topicId);

const container=document.getElementById("mcq-list");

container.innerHTML="";

if(data.length===0){
container.innerHTML="<p>No MCQs Found</p>";
return;
}

data.forEach((q,i)=>{

const div=document.createElement("div");
div.className="mcq-box";

div.innerHTML=`

<p><b>${i+1}. ${q.question}</b></p>

<div class="options">

<button onclick="checkAnswer(this,'A','${q.correct_option}')">
A. ${q.option_a}
</button>

<button onclick="checkAnswer(this,'B','${q.correct_option}')">
B. ${q.option_b}
</button>

<button onclick="checkAnswer(this,'C','${q.correct_option}')">
C. ${q.option_c}
</button>

<button onclick="checkAnswer(this,'D','${q.correct_option}')">
D. ${q.option_d}
</button>

</div>

<p class="answer" style="display:none">
Correct Answer: ${q.correct_option}
</p>

`;

container.appendChild(div);

});

}


/* CHECK ANSWER */

window.checkAnswer=function(btn,selected,correct){

const box=btn.parentElement.parentElement;

const buttons=box.querySelectorAll("button");
const answer=box.querySelector(".answer");

buttons.forEach(b=>b.disabled=true);

if(selected===correct){

btn.classList.add("correct");

}else{

btn.classList.add("wrong");

buttons.forEach(b=>{
if(b.innerText.startsWith(correct)){
b.classList.add("correct");
}
});

}

answer.style.display="block";

}


/* START */

loadTopics();
