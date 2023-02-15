"use strict";

const FOUND_MATCH_WAIT_MSECS = 1000;

const flippedCards = document.getElementsByClassName('flipped');
const matchedCards = document.getElementsByClassName('matched');
const totalCards = document.getElementsByClassName('card');

// TODO: Implement support for card back images instead of colors

let score = 0;
let lowestScore = Infinity;

/* ========================================================================== */
/* Start the Game (Create & Shuffle Cards)                                    */
/* ========================================================================== */

/* Shuffle Cards ------------------------------------------------------------ */

function shuffle(desiredCards) {
  if (desiredCards === 0) { desiredCards = 10; }
  const evenCards = Math.floor(Number(desiredCards) / 2);
  console.log(`Creating ${evenCards * 2} cards.`)
  const items = [];

  for (let i = 0; i < evenCards; i++) {
    const cardColor = getRandomColor();
    items.push(cardColor, cardColor);
    console.log('creating items:', items);
  }

  for (let i = items.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [items[i], items[j]] = [items[j], items[i]];
    console.log('shuffling items:', items);
  }

  return items;
}

/* Generate Random Card Back Color ------------------------------------------ */

function getRandomColor() {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16).toString(16);
  }
  return color;
}

/* Create Cards ------------------------------------------------------------- */

function createCards(gameCards) {
  const gameBoard = document.getElementById("game");

  for (let color of gameCards) {

    const newCard = document.createElement('div');

    newCard.classList.add(color);
    newCard.classList.add('card');

    newCard.addEventListener('click', function(event) {
      handleCardClick(event);
    });

    gameBoard.appendChild(newCard);
  }

}

/* ========================================================================== */
/* Game Form + Buttons                                                        */
/* ========================================================================== */

/* Start Game Button -------------------------------------------------------- */

const gameForm = document.getElementById('options');

gameForm.addEventListener('submit', function(event) {
  event.preventDefault();
  setGameBoard(event);
});

/* Set the Game Board ------------------------------------------------------- */

function setGameBoard(event) {

  // * Clear the game board
  const cards = document.getElementsByClassName('card');
  for (let i = cards.length -1; i >= 0; i--) {
    console.log(`Removed ${cards[i].classList[0]} card`);
    cards[i].remove();
  }

  // * Clear the end game message
  const endGameMsg = document.getElementById('end-game-message');
  if (endGameMsg) { endGameMsg.remove(); }

  // * Reshuffle and recreate cards
  dealDesiredCards();

  // * Update best and current score
  if (matchedCards.length === totalCards.length) {
    updateScore('end');
  } else {
    updateScore('restart');
  }

  // * Update counts on front-end
  updateCounts();

  // * Change button text to "New Game"
  document.getElementById('start').innerText = 'New Game';
}

/* Shuffle, Create, and Deal Desired Cards ---------------------------------- */

function dealDesiredCards() {
  const desiredCards = Number(document.querySelector('#num-cards').value);
  console.log('desiredCards:', desiredCards);
  createCards(shuffle(desiredCards));
}

/* ========================================================================== */
/* Scoring & Tracking                                                         */
/* ========================================================================== */

/* Update Card Counts ------------------------------------------------------- */

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

//TODO - Add hidden element for end game message so page doesn't adjust down

function updateScore(gameState = '') {
  // * Increment score by 1
  score += 1

  // * Mid-game restart, do not record score
  if (gameState === 'restart') { score = 0; }

  // * Game complete, record score
  if (gameState === 'end' || matchedCards.length === totalCards.length) {
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

/* ========================================================================== */
/* Card Flip                                                                  */
/* ========================================================================== */

/* Flip Card Face Up -------------------------------------------------------- */

function flipCard(card) {
  card.style.backgroundColor = card.classList[0];
  card.classList.toggle('flipped');
  if (flippedCards.length >= 2) {
    checkMatches();
  }
}

/* Flip Card Face Down ------------------------------------------------------ */

function unFlipCard(card) {
  card.classList.toggle('flipped');
  card.style.backgroundColor = "#fff8ef";
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