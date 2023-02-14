"use strict";

const FOUND_MATCH_WAIT_MSECS = 1000;

// TODO: Allow for any number of cards rather than always using the same deck
// TODO: Instead of hard-coding colors, use something else like images



// * Global variable trackers for flipped, matched, guessed cards

const flippedCards = document.getElementsByClassName('flipped');
const matchedCards = document.getElementsByClassName('matched');


// ? Optional: Might also be nice to capture user name / identity

// TODO: Increment a score for every guess made
// TODO: Store the lowest-scoring game in local storage so players can see a record of who played

let score = 0;

/* --------------------------- Update Card Counts --------------------------- */

function updateCounts() {
  document.getElementById('match-count').innerText = matchedCards.length;
  document.getElementById('flip-count').innerText = flippedCards.length;
}
updateCounts();

/* ========================================================================== */
/* Start the Game (Create & Shuffle Cards)                                    */
/* ========================================================================== */

/* Shuffle Cards ------------------------------------------------------------ */

const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

const colors = shuffle(COLORS);

/* ------------------------------ Create Cards ------------------------------ */

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
});

/* Restart Game Button ------------------------------------------------------ */
// TODO: Add a button that when clicked will re-start the game

const restartButton = document.createElement('button');
const title = document.getElementById('title');

restartButton.innerText = "Restart Game";
restartButton.id = 'restart';

function restartGame() {
  // Clear current game board
  // Clear current score
  // Reshuffle and recreate cards
}




/* ---------------------------- Flip Card Face Up --------------------------- */

// TODO: Animate the card-flip

function flipCard(card) {
  card.style.backgroundColor = card.classList[0];
  card.classList.toggle('flipped');

  if (flippedCards.length >= 2) {
    checkMatches();
  }

}

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

//SECTION -  Flip a card face-down.

function unFlipCard(card) {
  console.log(`Unflipped ${card.style.backgroundColor}`);

  card.classList.toggle('flipped');
  card.style.backgroundColor = 'white';
  updateCounts();
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // TODO: Redo this implementation to just use classList rather than creating an array
  if (!evt.target.className.split(' ').includes('flipped')) {
    if (flippedCards.length < 2) {
      flipCard(evt.target);
    }
  }
  updateCounts();
}
