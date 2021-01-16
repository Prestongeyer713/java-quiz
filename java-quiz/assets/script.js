var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions 
var questionanswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentindex = 0;
var score = 0;
var count = 100;
var alert =document.getElementById("alert");
var info = document.getElementById("info");
var allScores = [];
var storedScoresSpan = document.querySelector('#storedScores');
var questions = [
    {
        title: "Inside which HTML element do we put the JavaScript?:---",
        choices: ["<script>","<scripting>","<javascript>", "<js>"],
        answer : "<script>"    
    },
    {
        title: "Where is the correct place to insert a JavaScript?:---",
        choices: ["the <head> section","the <body> section","Both the <head> section and the <body> section are correct"],
        answer : "Both the <head> section and the <body> section are correct"    
    },
    {
        title: "What is the correct syntax for referring to an external scipt called 'xxxx.js':---",
        choices: ["<script name= 'xxx.js'>","<script href='xxx.js'>","<script src='xxx.js'>"],
        answer : "<script src='xxx.js'>"    
    },
    {
        title: "The external JavaScript file must contain the <script> tag?:---",
        choices: ["True","False","none of the above"],
        answer : "False"    
    },
    {
        title: "How do you create a function in JavaScript?:---",
        choices: ["function=myFunction()","function myFunction()","function:myFunction()", "All of The Above"],
        answer : "function myFunction()"    
    },
    {
       title: "How do you call a function named 'myFunction'?:---",
       choices: ["call myFunction()","myFunction()","call function myFunction()","all of the above"],
       answer : "myFunction()"
    },
    {
      title: "How to write an IF statement in JavaScript?:---",
      choices: ["if(i==5)","ifi=5","ifi-5 then","if i== 5 then"],
      answer : "if(i==5)"
    },
    {
      title: "How can you add a comment in a JavaScript?:---",
      choices: ["'This is a comment","//This is a comment","<!--This is a comment-->","all of the above"],
      answer : "//This is a comment"
    },
    {
      title: "How do you orund the number 7.25, to the nearest integer?:---",
      choices: ["rund(7.25)","round(7.25)","Math.round(7.25)","Mathrnd(7.25)"],
      answer : "Math.round(7.25)"
    },
    {
      title: "JavaScript is the same as java?:---",
      choices: ["true","false"],
      answer : "false"
    },
]
// game logic 
btnStart.addEventListener("click", starQuiz);
function starQuiz(){
    if(storedScores !==null) {
        allScores = storedScores;
    }
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timecounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions= questions[currentindex]
    console.log(nextQuestions.title)
    
        displayQuestion(nextQuestions)

    gametime()
}
btnScore.addEventListener("click" , function(){
    let name = document.getElementById("inputScore").value
    scorePage(name, count)
});
// starts game timer
function gametime(){

    var timeinterval = setInterval(function(){
        timer.innerText = count
         count--;
        }, 1000);

}

// displays questions by pulling them and placing properly
function displayQuestion(question){
    titleitem.innerText=question.title
    question.choices.forEach(element => {
     var button =document.createElement("button")
    button.className="btn-primary btn-block text-left"
    button.innerText=element
    questionanswers.appendChild(button)
    button.addEventListener("click", displaynextQuestion)
    });
}

// reactions to user input when an answer is answered it will notify based on the if the user was correct or not.
function displaynextQuestion(e){
    currentindex++
    if(currentindex < questions.length){
        correction(e.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML=""
        if(currentindex < questions.length){    
            nextQuestions= questions[currentindex]
            displayQuestion(nextQuestions)  
        }else {
            currentindex = 0
            displayQuestion(nextQuestions)  
        }

    }else{
        console.log("endgame")
        endgame()
        

    }
    
     
}
function correction(response){
    
    if(response){
        alert.innerText= "correct"
        console.log("correct")
    }else {
        alert.innerText="incorrect"
        count = count -10
        timer.innerHTML = count
        console.log("incorrect")

    }
    setTimeout(function(){
        alert.innerText=""
    
        }, 1000);

}
 function endgame (){
    myScore.innerText = count
    addscore.classList.remove("d-none")
    timecounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
    addscore.classList.remove("d-none")
    setLocalStorage();


 }
// endgame logic. stores scores and displays them based on the users performance.

var storedScores = document.querySelector('#storedScores');
var highScoresArea = document.querySelector("#highScoresList");
var backBtn = document.querySelector("#btn-back");
var clearBtn = document.querySelector("#btn-clear");
// set local storage
function setLocalStorage() {
    localStorage.setItem("storedScores",score);
}
function displayScores() {
  var storedScores = localStorage.getItem('storedScores');
  console.log(storedScores);
  if (storedScores === null) {
    return;
  }
  storedScoresSpan.textContent = storedScores;
}

displayScores();

backBtn.addEventListener("click", function () {
    location.href = "index.html";
});

clearBtn.addEventListener("click", function () {
    highScoresArea.innerHTML = "";
    window.localStorage.clear();

});