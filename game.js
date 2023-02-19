const question =document.getElementById("question");
const choise=Array.from(document.getElementsByClassName("choise-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressbarfull = document.getElementById("progressbarfull");
let currentQuestion={};
let acceptingAnswers=false;
let score =0;
let questionCounter=0;
let availableQuestion=[];

let questions= [
    {
        question:"Inside which HTML element do we put the javaScript?",
        choise1: "<scripts>",
        choise2: "<javascript>",
        choise3: "<js>",
        choise4: "<scripting>",
        answer: 1

    },
    {
        question:"Full form of HTML?",
        choise1:"<Hyper text protocol>",
        choise2:"<Hyper text Markup Language>",
        choise3:"<HyperText Markdown Language>",
        choise4:"<None of the above>",
        answer:2
    },
   {
    question:"What is the smallest header in the HTML by default?",
    choise1:"<h1>",
    choise2:"<h3>",
    choise3:"<h4>",
    choise4:"<h6>",
    answer:4
   },
   {
    question:"What are the types of lists available in HTML?",
    choise1:"<Order,Unorder Lists.>",
    choise2:"<Bulleted,Numbered Lists.>",
    choise3:"<Named,Unnamed Lists>",
    choise4:"<None of the above.>",
    answer:1
   },
   {
    question:"HTML files are saved by default with the extension?",
    choise1:"<.html>",
    choise2:"<.h>",
    choise3:"<.ht>",
    choise4:"<None of the above>",
    answer:1
   }
];
// constraint
const CORRECT_BONUS=10;
const MAX_QUESTIONS=5;

startGame=() =>{
    questionCounter=0;
    score=0;
    availableQuestion=[...questions];
    console.log(availableQuestion);
    getNewQuestion();
};
getNewQuestion = () => {
    if(availableQuestion.length==0 || questionCounter >= MAX_QUESTIONS ){
       localStorage.setItem('mostRecentScore' , score);
        //go to the end page
        return window.location.assign("Online_Quiz/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //update the progress bar -------------
    progressbarfull.style.width = `${(questionCounter/MAX_QUESTIONS) *100}%`;
   

    const questionIndex=Math.floor(Math.random() * availableQuestion.length);
    currentQuestion=availableQuestion[questionIndex];
    question.innerText =currentQuestion.question;

    choise.forEach(choise=>{
        const number = choise.dataset["number"];
        choise.innerText=currentQuestion["choise" + number];

    });
    availableQuestion.splice(questionIndex,1);
    acceptingAnswers=true;

};
choise.forEach(choise => {
    choise.addEventListener('click',(e) =>{
       if(!acceptingAnswers) return;
       acceptingAnswers=false;
       const selectedChoise=e.target;
       const selectedAnswer=selectedChoise.dataset["number"];
    
      const classToApply = selectedAnswer == currentQuestion.answer ? 'correct'
       : 'incorrect';
       if(classToApply == 'correct')
       {
        incrementScore(CORRECT_BONUS);
       }
       selectedChoise.parentElement.classList.add(classToApply);
       setTimeout( () => {
        selectedChoise.parentElement.classList.remove(classToApply);
        getNewQuestion();
       },1000);
    });
});
incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
}
startGame();
