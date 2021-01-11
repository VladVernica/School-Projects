function getUserScore() {
    var userScoreString=document.getElementById("userScore").innerHTML;
    var userScore=parseInt(userScoreString, 10);
    return userScore;
}

function getComputerScore() {
    var computerScoreString=document.getElementById("computerScore").innerHTML;
    var computerScore=parseInt(computerScoreString, 10);
    return computerScore;
}

function changeUserScore(userScore) {
    userScore++;
    var userScoreString=userScore+"";
    document.getElementById("userScore").innerHTML=userScoreString;
    if(userScore==10) {
        alert("You won!!! yeeey!!!");
        document.getElementById("userScore").innerHTML="0";
        document.getElementById("computerScore").innerHTML="0";
    }
}

function changeComputerScore(computerScore) {
    computerScore++;
    var computerScoreString=computerScore+"";
    document.getElementById("computerScore").innerHTML=computerScoreString;
    if(computerScore==10) {
        document.getElementById("userScore").innerHTML="0";
        document.getElementById("computerScore").innerHTML="0";
        alert("You lost! Better luck next time.");
    }
}

function generateComputerChoice() {
    var choices=["Rock","Paper","Scissors"];
    document.getElementById("computerChoice").innerHTML=choices[Math.floor(Math.random()*choices.length)];
}

function getUserChoice() {
    if(document.getElementById("rockInput").checked) {
        return "Rock";
    }
    if(document.getElementById("paperInput").checked) {
        return "Paper";
    }
    if(document.getElementById("scissorsInput").checked) {
        return "Scissors";
    }  
}

function getComputerChoice() {
    return document.getElementById("computerChoice").innerHTML;
}

function getTheWinner (userChoice, computerChoice) {
    if (userChoice==="Rock" && computerChoice=="Rock") { return 0; }
    if (userChoice==="Rock" && computerChoice=="Paper") { return 2; }
    if (userChoice==="Rock" && computerChoice=="Scissors") { return 1; }
    if (userChoice==="Paper" && computerChoice=="Rock") { return 1; }
    if (userChoice==="Paper" && computerChoice=="Paper") { return 0; }
    if (userChoice==="Paper" && computerChoice=="Scissors") { return 2; }
    if (userChoice==="Scissors" && computerChoice=="Rock") { return 2; }
    if (userChoice==="Scissors" && computerChoice=="Paper") { return 1; }
    if (userChoice==="Scissors" && computerChoice=="Scissors") { return 0; }
}

function changeTheScore(winner) {
    if(winner==1) { changeUserScore(getUserScore()); }
    if(winner==2) { changeComputerScore(getComputerScore()); }
}

function play() {
    generateComputerChoice();
    var userChoice = getUserChoice();
    console.log(userChoice);
    var computerChoice = getComputerChoice();
    console.log(computerChoice);
    var winner = getTheWinner(userChoice, computerChoice);
    console.log(winner);
    changeTheScore(winner);
}

document.getElementById("playButton").addEventListener("click", () => play());