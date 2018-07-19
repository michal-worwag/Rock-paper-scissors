'use strict';

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
var tableDiv = document.getElementById('tableResult');
var params = {
  winner: 0,
  rounds: 0,
  wins: 0,
  lost: 0,
  roundsPlayed: 0,
  progress: []
};

newGameBtn.addEventListener("click", newGame);

for (var i = 0; i < playerMoveBtn.length; i++){
  playerMoveBtn[i].addEventListener('click', function(){
    var playerChoice = event.target.getAttribute('data-move');
    playerMove(playerChoice);
  })
};

function playerMove(playerMove) {
  var computerMove = compMove();
  whoWin(playerMove, computerMove);

  params.progress.push({
    gameRounds: params.roundsPlayed,
    gamePlayerMove: playerMove,
    gameComputerMove: computerMove,
    roundWinner: params.winner,
    finalResult: params.wins + ' - ' + params.lost
})
};

function compMove() {
  var compChoice = Math.floor(Math.random() * 3 + 1);
  if (compChoice == 1) {
     return "PAPER"
  } else if (compChoice == 2) {
    return "ROCK"
  } else if (compChoice == 3) {
     return "SCISSORS"
  }
};

function whoWin(playerMove, computerMove) {
  if (playerMove === computerMove) {
    output.innerHTML = "It's a TIE " + "You pick " +  playerMove + " Computer pick " + computerMove;
    params.roundsPlayed++;
    params.winner = "TIE";
  } else if (
    (playerMove === "ROCK" && computerMove === "PAPER") ||
    (playerMove === "SCISSORS" && computerMove === "ROCK") ||
    (playerMove === "PAPER" && computerMove === "SCISSORS")
  ) {
    output.innerHTML = "Computer WON " + "You pick " + playerMove + " Computer pick " + computerMove;
    params.lost++;
    params.roundsPlayed++;
    params.winner = "COMP";
  } else {
    output.innerHTML = "YOU WON: " + "You pick " + playerMove + " Computer pick " + computerMove;
    params.wins++;
    params.roundsPlayed++;
    params.winner = "PLAYER";
  }
  pointsCounter();
  gameFinish();
};

function pointsCounter() {
  playerPoints.innerHTML = params.wins;
  computerPoints.innerHTML = params.lost;
};

function gameFinish() {
    var modalHeader = document.getElementById('modalHeader');
  if (params.wins == params.rounds) {
    modalHeader.innerHTML = "YOU WON THE ENTIRE GAME!!!";
    buttonProp();
    showModal();
  } else if (params.lost == params.rounds) {
    modalHeader.innerHTML = "COMPUTER WON THE ENTIRE GAME!!!";
    buttonProp();
    showModal();
  }
};
//Function with buttons properities
  function buttonProp(){
    newGameBtn.disabled = false;
    paperButton.disabled = true;
    rockButton.disabled = true;
    scissorsButton.disabled = true;
  };

function newGame() {
  params.rounds = prompt("How many rounds would You like to play?", 3);
  if (isNaN(params.rounds)) {
    output.innerHTML = "Error. Type number";
    buttonProp();
  } else if (params.rounds <= 0) {
    output.innerHTML = "Error. Number must be higher than 0";
    buttonProp();
  } else {
    output.innerHTML = "Let's play a game";
    roundsSpace.innerHTML = params.rounds;
    newGameBtn.disabled = true;
    paperButton.disabled = false;
    rockButton.disabled = false;
    scissorsButton.disabled = false;
    pointsCounter();
    clear();
  }
};
// Function to clear table
function clear(){
  params.wins = params.lost = 0;
  params.roundsPlayed = 0;
  params.winner = 0;
  params.progress = [];
  tableDiv.innerHTML = "";
}

// Modals

function showModal (){
  document.querySelector('.overlay').classList.add('show');
  var modal = document.querySelector('.modal');
  modal.classList.add('show'); 
  buildTable();
 };

var hideModal = function(event){
  event.preventDefault();
  document.querySelector('.overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');
  for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
};

document.querySelector('.overlay').addEventListener('click', hideModal);

var modals = document.querySelectorAll('.modal');

for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
    event.stopPropagation();
  });
};

// End of modals
// Creating table

function buildTable(){
    var table = document.createElement('table');
    tableDiv.appendChild(table);
    var thead = document.createElement('thead');
    table.appendChild(thead);
    var trTable = "<tr><th>Round</th><th>Player Move</th><th>Computer Move</th><th>Round Winner</th><th>Result</th></tr>";
    thead.innerHTML = trTable;
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);  
    params.progress.forEach(function(progressResult){
        var row = document.createElement('tr');
        tbody.appendChild(row);
        for (var key in progressResult){
            buildTableTd(progressResult[key], row);
        }
    })
};

function buildTableTd(value, row){
    var td = document.createElement('td');
    td.innerHTML = value;
    row.appendChild(td);
};