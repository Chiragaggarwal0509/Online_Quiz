const username =document.getElementById('username');
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');


 const highScore= JSON.parse(localStorage.getItem("highScore")) || [];
 const MAX_HIGH_SCORE=5;
finalScore.innerText = mostRecentScore;
username.addEventListener('Keyup', () =>{
    saveScoreBtn.disable = !username.value;
});
saveHighScore = (e) =>{
    console.log("clicked the save button!");
    e.preventDefault();

    const score ={
        score: Math.floor(Math.random()*100),
        name:username.value
    };
    highScore.push(score);
    
    highScore.sort((a,b)=> b.score - a.score)
   highScore.splice(5);
   
   localStorage.setItem("highScore",JSON.stringify(highScore));
   window.location.assign("/");
};
