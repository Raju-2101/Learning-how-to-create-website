/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// done by me

// const rollDice = document.querySelector(".btn-roll");
// const player1 = document.querySelector("#name-0");
// const player2 = document.querySelector("#name-1");
// const score1 = document.querySelector("#score-0");
// const score2 = document.querySelector("#score-1");
// const dice = document.querySelector(".dice");
// const current1 = document.querySelector("#current-0");
// const current2 = document.querySelector("#current-1");

// var score, roundScore, addScore;
// score = [0, 0];
// roundScore = 0;
// rollDice.addEventListener("click", play);
// addScore = 0;

// function play() {
//   roundScore = Math.floor(Math.random() * 6) + 1;
//   dice.setAttribute("src", "./dice-" + roundScore + ".png");
//   current1.textContent = roundScore;
//   addScore += roundScore;
//   score1.textContent = addScore;
//   if (addScore > 100) {
//     player1.textContent += " Wins";
//   }
// }

// parctice

// declaring variables
var score, roundScore, activePlayer, start, previousNumber, inputNumber, value;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (start) {
    var randomNumber1 = Math.floor(Math.random() * 6) + 1;
    var randomNumber2 = Math.floor(Math.random() * 6) + 1;

    var randomNumber = randomNumber1 + randomNumber2;

    var dice1 = document.querySelector(".dice-1");
    var dice2 = document.querySelector(".dice-2");
    dice1.style.display = "block";
    dice2.style.display = "block";
    dice1.src = "./dice-" + randomNumber1 + ".png";
    dice2.src = "./dice-" + randomNumber2 + ".png";

    if (
      randomNumber1 !== 1 &&
      randomNumber2 !== 1 &&
      previousNumber !== randomNumber
    ) {
      roundScore += randomNumber;
      previousNumber = randomNumber;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      turn();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (start) {
    score[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      score[activePlayer];

    if (score[activePlayer] >= inputNumber) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document.querySelector(".dice-1").style.display = "none";
      document.querySelector(".dice-2").style.display = "none";

      start = false;
    } else {
      turn();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

document.querySelector("input").addEventListener("change", function() {
  value = Number(document.querySelector("input").value);

  if (value) {
    inputNumber = value;
  } else {
    document.querySelector("input").value = "";
    inputNumber = 100;
  }
});

// setting everything to 0
function init() {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  previousNumber = 0;
  inputNumber = 100;
  document.querySelector("input").value = "";
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".dice-1").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";
  start = true;

  for (var i = 0; i < 2; i++) {
    document.querySelector("#score-" + i).textContent = 0;
    document.querySelector("#current-" + i).textContent = 0;
    document
      .querySelector(".player-" + i + "-panel")
      .classList.remove("winner");
  }
}

function turn() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  // document.querySelector(".dice-1").style.display = "none";
  // document.querySelector(".dice-2").style.display = "none";
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
