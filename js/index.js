var paperButton = document.getElementById("paperButton");
var rockButton = document.getElementById("rockButton");
var scissorsButton = document.getElementById("scissorsButton");
var output = document.getElementById("output");
var result = document.getElementById("result");
var playerPoints = document.getElementById("playerPoints");
var computerPoints = document.getElementById("computerPoints");
var wins = 0;
var lost = 0;
var newGameBtn = document.getElementById("newGameBtn");
var rounds;
var roundsSpace = document.getElementById("roundsSpace");
var errorRound = document.getElementById("errorRound");

var playerMoveBtn = document.querySelectorAll('.player-move');

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
  var comp;
  if (compChoice == 1) {
    return (comp = "PAPER");
  } else if (compChoice == 2) {
    return (comp = "ROCK");
  } else if (compChoice == 3) {
    return (comp = "SCISSORS");
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
    lost++;
  } else {
    output.innerHTML = "YOU WON: " + "You pick " + playerMove + " Computer pick " + computerMove;
    wins++;
  }
  pointsCounter();
  gameFinish();
};

function pointsCounter() {
  playerPoints.innerHTML = wins;
  computerPoints.innerHTML = lost;
};

function gameFinish() {
  if (wins == rounds) {
    output.innerHTML = "YOU WON THE ENTIRE GAME!!!";
    newGameBtn.disabled = false;
    paperButton.disabled = true;
    rockButton.disabled = true;
    scissorsButton.disabled = true;
  } else if (lost == rounds) {
    output.innerHTML = "COMPUTER WON THE ENTIRE GAME!!!";
    newGameBtn.disabled = false;
    paperButton.disabled = true;
    rockButton.disabled = true;
    scissorsButton.disabled = true;
  }};

function newGame() {
  rounds = prompt("How many rounds would You like to play?", 3);
  if (isNaN(rounds)) {
    output.innerHTML = "Error. Type number";
    newGameBtn.disabled = false;
    paperButton.disabled = true;
    rockButton.disabled = true;
    scissorsButton.disabled = true;
  } else if (rounds <= 0) {
    output.innerHTML = "Error. Number must be higher than 0";
    newGameBtn.disabled = false;
    paperButton.disabled = true;
    rockButton.disabled = true;
    scissorsButton.disabled = true;
  } else {
    output.innerHTML = "Let's play a game";
    roundsSpace.innerHTML = rounds;
    newGameBtn.disabled = true;
    paperButton.disabled = false;
    rockButton.disabled = false;
    scissorsButton.disabled = false;
    wins = lost = 0;
  }};

newGameBtn.addEventListener("click", newGame);