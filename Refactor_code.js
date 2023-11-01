/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores, roundScore, activePlayer, gamePlaying;

main();
// Roll Dice Button Click
document.querySelector(".btn-roll").addEventListener("click", playerRollDice);
// Hold Score of User Button
document.querySelector(".btn-hold").addEventListener("click", playerHoldScore);
// New Game Button
document.querySelector(".btn-new").addEventListener("click", main);

// Init Function part

function initializeGameVariables() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
}

function hideDiceImages() {
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

function resetPlayerInfoAndClasses() {
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  resetCurrentScores();
  // document.querySelector(".final-score").value = "";
  document
    .querySelector(".player-0-panel")
    .classList.remove("winner", "active");
  document
    .querySelector(".player-1-panel")
    .classList.remove("winner", "acitve");
}

function setActivePlayer(player) {
  document.querySelector(`.player-${player}-panel`).classList.add("active");
}

// User Roll Dice

function rollDice() {
  let dice1value = Math.floor(Math.random() * 6) + 1;
  let dice2value = Math.floor(Math.random() * 6) + 1;
  return { dice1value, dice2value };
}

function updateDiceImages(dice1, dice2) {
  document.getElementById("dice-1").style.display = "block";
  document.getElementById("dice-2").style.display = "block";
  document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
  document.getElementById("dice-2").src = "dice-" + dice2 + ".png";
}

function checkDiceValueAndUpdateScore(dice1, dice2) {
  if (dice1 !== 1 && dice2 !== 1) {
    //Add score
    roundScore += dice1 + dice2;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    //Next player
    handleNextPlayer();
  }
}

function playerRollDice() {
  if (gamePlaying) {
    // 1. Random number
    let { dice1value, dice2value } = rollDice();
    //2. Display the result
    updateDiceImages(dice1value, dice2value);
    //3. Update the round score IF the rolled number was NOT a 1
    checkDiceValueAndUpdateScore(dice1value, dice2value);
  }
}

// Functions Hold User Values

function updatePlayerTotalScore() {
  scores[activePlayer] += roundScore;
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];
}

function getWinningScoreFromInput() {
  let input = document.querySelector(".final-score").value;
  let winningScore = input;

  if (!input) {
    winningScore = 100;
  }
  return parseInt(winningScore);
}

function checkIfPlayerWonAndUpdateClass(winningScore) {
  if (scores[activePlayer] >= winningScore) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    hideDiceImages();
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
    gamePlaying = false;
  } else {
    handleNextPlayer();
  }
}

function playerHoldScore() {
  if (gamePlaying) {
    updatePlayerTotalScore();
    let winningScore = getWinningScoreFromInput();
    checkIfPlayerWonAndUpdateClass(winningScore);
  }
}

// Next Player Functions

function resetCurrentScores() {
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
}

function toggleActivePlayer() {
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function switchPlayerAndReset() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  resetCurrentScores();
  toggleActivePlayer();
  hideDiceImages();
}

function handleNextPlayer() {
  switchPlayerAndReset();
}

function main() {
  initializeGameVariables();
  hideDiceImages();
  resetPlayerInfoAndClasses();
  setActivePlayer(0);
}
