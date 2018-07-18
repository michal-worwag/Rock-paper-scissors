'use strict'

var paperButton = document.getElementById("paperButton");
var rockButton = document.getElementById("rockButton");
var scissorsButton = document.getElementById("scissorsButton");
var output = document.getElementById("output");
var result = document.getElementById("result");
var playerPoints = document.getElementById("playerPoints");
var computerPoints = document.getElementById("computerPoints");
var newGameBtn = document.getElementById("newGameBtn");
var roundsSpace = document.getElementById("roundsSpace");
var errorRound = document.getElementById("errorRound");

var playerMoveBtn = document.querySelectorAll('.player-move');

var params = {
  rounds: 0,
  wins: 0,
  lost: 0,
  roundsPlayed: 0
}


for (var i = 0; i < playerMoveBtn.length; i++){
  playerMoveBtn[i].addEventListener('click', function(){
    var playerChoice = event.target.getAttribute('data-move');
    playerMove(playerChoice);
  })
};

function playerMove(playerMove) {
  var computerMove = compMove();
  whoWin(playerMove, computerMove);
}

function compMove() {
  var compChoice = Math.floor(Math.random() * 3 + 1);
  
  if (compChoice == 1) {
     return "PAPER"
  } else if (compChoice == 2) {
    return "ROCK"
  } else if (compChoice == 3) {
     return "SCISSORS"
  }
}

function whoWin(playerMove, computerMove) {
  if (playerMove === computerMove) {
    output.innerHTML = "It's a TIE " + "You pick " +  playerMove + " Computer pick " + computerMove;
  } else if (
    (playerMove === "ROCK" && computerMove === "PAPER") ||
    (playerMove === "SCISSORS" && computerMove === "ROCK") ||
    (playerMove === "PAPER" && computerMove === "SCISSORS")
  ) {
    output.innerHTML = "Computer WON " + "You pick " + playerMove + " Computer pick " + computerMove;
    params.lost++;
  } else {
    output.innerHTML = "YOU WON: " + "You pick " + playerMove + " Computer pick " + computerMove;
    params.wins++;
  }
  pointsCounter();
  gameFinish();
};

function pointsCounter() {
  playerPoints.innerHTML = params.wins;
  computerPoints.innerHTML = params.lost;
};

function gameFinish() {
  if (params.wins == params.rounds) {
    output.innerHTML = "YOU WON THE ENTIRE GAME!!!";
    newGameBtn.disabled = false;
    paperButton.disabled = true;
    rockButton.disabled = true;
    scissorsButton.disabled = true;
  } else if (params.lost == params.rounds) {
    output.innerHTML = "COMPUTER WON THE ENTIRE GAME!!!";
    newGameBtn.disabled = false;
    paperButton.disabled = true;
    rockButton.disabled = true;
    scissorsButton.disabled = true;
  }};

function newGame() {
  params.rounds = prompt("How many rounds would You like to play?", 3);
  if (isNaN(params.rounds)) {
    output.innerHTML = "Error. Type number";
    newGameBtn.disabled = false;
    paperButton.disabled = true;
    rockButton.disabled = true;
    scissorsButton.disabled = true;
  } else if (params.rounds <= 0) {
    output.innerHTML = "Error. Number must be higher than 0";
    newGameBtn.disabled = false;
    paperButton.disabled = true;
    rockButton.disabled = true;
    scissorsButton.disabled = true;
  } else {
    output.innerHTML = "Let's play a game";
    roundsSpace.innerHTML = params.rounds;
    newGameBtn.disabled = true;
    paperButton.disabled = false;
    rockButton.disabled = false;
    scissorsButton.disabled = false;
    params.wins = params.lost = 0;
    pointsCounter();
  }};

newGameBtn.addEventListener("click", newGame);