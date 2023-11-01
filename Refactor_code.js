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
document.querySelector(".btn-roll").addEventListener("click", userRollDice);
// Hold Score of User Button
document.querySelector(".btn-hold").addEventListener("click", userHoldScore);
// New Game Button
document.querySelector(".btn-new").addEventListener("click", main);

// Init Function part

function initializeVariable() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
}

function imageDisplayNone() {
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

function resetPlayerContentAndClasses() {
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  currentValueToNone();
  // document.querySelector(".final-score").textContent = "";

  document.getElementById("current-1").textContent = "0";
  document
    .querySelector(".player-0-panel")
    .classList.remove("winner", "active");
  document
    .querySelector(".player-1-panel")
    .classList.remove("winner", "acitve");
}

function showWhichPlayerToActive(player) {
  document.querySelector(`.player-${player}-panel`).classList.add("active");
}

// User Roll Dice

function generateRandomNumber() {
  let dice1value = Math.floor(Math.random() * 6) + 1;
  let dice2value = Math.floor(Math.random() * 6) + 1;
  return { dice1value, dice2value };
}

function diceResultImageOnScreen(dice1, dice2) {
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
    nextPlayer();
  }
}

function userRollDice() {
  if (gamePlaying) {
    // 1. Random number
    let { dice1value, dice2value } = generateRandomNumber();
    //2. Display the result
    diceResultImageOnScreen(dice1value, dice2value);
    //3. Update the round score IF the rolled number was NOT a 1
    checkDiceValueAndUpdateScore(dice1value, dice2value);
  }
}

// Functions Hold User Values

function updatePlayerScore() {
  scores[activePlayer] += roundScore;
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];
}

function checkUserEnterWinningScore() {
  let input = document.querySelector(".final-score").value;
  let winningScore;

  if (input) {
    winningScore = input;
  } else {
    winningScore = 100;
  }
  return winningScore;
}

function checkUserWonGameAndUpdateClass(winningScore) {
  if (scores[activePlayer] >= winningScore) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    imageDisplayNone();
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
    gamePlaying = false;
  } else {
    nextPlayer();
  }
}

function userHoldScore() {
  if (gamePlaying) {
    updatePlayerScore();
    let winningScore = checkUserEnterWinningScore();
    checkUserWonGameAndUpdateClass(winningScore);
  }
}

// Next Player Functions

function currentValueToNone() {
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
}

function toggleClassesBothPlayer() {
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function switchPlayerAndResetPlayerContent() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  currentValueToNone();
  toggleClassesBothPlayer();
  imageDisplayNone();
}

function nextPlayer() {
  switchPlayerAndResetPlayerContent();
}

function main() {
  initializeVariable();
  imageDisplayNone();
  resetPlayerContentAndClasses();
  showWhichPlayerToActive(0);
}
