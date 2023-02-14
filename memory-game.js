"use strict";

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

// TODO: Allow for any number of cards rather than always using the same deck
// TODO: Instead of hard-coding colors, use something else like images

const flippedCards = document.getElementsByClassName('flipped');
const matchedCards = document.getElementsByClassName('matched');
const totalCards = document.getElementsByClassName('card');

// ? Optional: Might also be nice to capture user name / identity

let score = 0;
let lowestScore = Infinity;

/* ========================================================================== */
/* Start the Game (Create & Shuffle Cards)                                    */
/* ========================================================================== */

/* --------------------------- Update Card Counts --------------------------- */

function updateCounts() {
  document.getElementById('match-count').innerText = matchedCards.length;
  document.getElementById('flip-count').innerText = flippedCards.length;
  document.getElementById('current-score').innerText = score;

  let bestScore = 0;
  if (lowestScore < Infinity) { bestScore = lowestScore; }
  document.getElementById('best-score').innerText = bestScore;
}
updateCounts();

/* Update Score ------------------------------------------------------------- */

function updateScore(forceClear = false) {
  // if forceClear === true, end the game but do not record the score
  score += 1
  if (forceClear) { score = 0; }
  if (matchedCards.length === totalCards.length) {
    const endGameMessage = document.createElement('p');
    endGameMessage.id = 'end-game-message';

    if (score < lowestScore) {
      endGameMessage.innerText = 'New Best Score! Congratulations!';
      lowestScore = score;
    } else {
      endGameMessage.innerText = 'Great job! Play again?';
    }
    title.appendChild(endGameMessage);
  }
}

/* Shuffle Cards ------------------------------------------------------------ */

function shuffle(items) {

  for (let i = items.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

const colors = shuffle(COLORS);

/* Create Cards ------------------------------------------------------------- */

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */
// TODO: Remove innerText showing card color
// TODO: Style the cards to look more like cards


function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    const card = document.createElement('div');

    card.classList.add(color);
    card.classList.add('card');

    card.innerText = color;

    card.addEventListener('click', function(event) {
      handleCardClick(event);
    });
    gameBoard.appendChild(card);
  }
}

/* Start Game Button -------------------------------------------------------- */

const startButton = document.getElementById('start');

startButton.addEventListener('click', function(event) {
  createCards(colors);
  event.target.remove();
  title.appendChild(restartButton);
});

/* Restart Game Button ------------------------------------------------------ */
//NOTE - Restarts game mid-game

const restartButton = document.createElement('button');
const title = document.getElementById('title');

restartButton.innerText = "New Game";
restartButton.id = 'restart';

restartButton.addEventListener('click',  function(event) {
  restartGame();
});

function restartGame() {

  //NOTE - Clear game board
  const cards = document.getElementsByClassName('card');
  for (let i = cards.length -1; i >= 0; i--) {
    console.log(`Removed ${cards[i].classList[0]} card`);
    cards[i].remove();
  }

  const endGameMsg = document.getElementById('end-game-message');
  if (endGameMsg) { endGameMsg.remove(); }
  createCards(shuffle(colors));
  updateScore(true);
  updateCounts();
}

/* Flip Card Face Up -------------------------------------------------------- */

//REVIEW - How to animate the card flip?

function flipCard(card) {
  card.style.backgroundColor = card.classList[0];
  card.classList.toggle('flipped');
  if (flippedCards.length >= 2) {
    checkMatches();
  }
}

/* Flip Card Face Down ------------------------------------------------------ */

function unFlipCard(card) {
  console.log(`Unflipped ${card.style.backgroundColor}`);

  card.classList.toggle('flipped');
  card.style.backgroundColor = 'white';
  updateCounts();
}

/* Check for Matches -------------------------------------------------------- */

function checkMatches() {
  if (flippedCards[0].classList[0] === flippedCards[1].classList[0]) {
    for (let i = flippedCards.length - 1; i >= 0; i--) {
      flippedCards[i].classList.toggle('matched');
      flippedCards[i].classList.toggle('flipped');
    }
  } else {
    setTimeout(() => {
      for (let i = flippedCards.length - 1; i >= 0; i--) {
        unFlipCard(flippedCards[i]);
      }
    }, FOUND_MATCH_WAIT_MSECS);
  }
}

/* Handle Card Click -------------------------------------------------------- */

function handleCardClick(evt) {
  if (!evt.target.className.split(' ').includes('flipped')) {
    if (flippedCards.length < 2) {
      flipCard(evt.target);
      updateScore();
      updateCounts();
    }
  }
}