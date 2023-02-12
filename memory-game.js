"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);
let flippedCards = [];
let matchedCards = [];

const flippedCount = document.createElement('p');
const matchedCount = document.createElement('p');
flippedCount.classList.add('flipped-count');
matchedCount.classList.add('matched-count');

const gameTitle = document.getElementsByTagName('h1')[0];

gameTitle.appendChild(flippedCount);
gameTitle.appendChild(matchedCount);

function updateCounts() {
  flippedCount.innerText = `Flipped: ${flippedCards.length}`;
  matchedCount.innerText = `Matched: ${matchedCards.length}`;
}
updateCounts();

createCards(colors);



/** Shuffle array items in-place and return shuffled array. */

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

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

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

/** Flip a card face-up. */

function flipCard(card) {
  card.style.backgroundColor = card.className;
  card.classList.toggle('flipped');
  flippedCards.push(card);

  if (flippedCards.length >= 2) {
    checkMatches(flippedCards);
  }

}

function checkMatches(cardPair) {
  if (cardPair[0].className === cardPair[1].className) {
    matchedCards.push(...cardPair);
    flippedCards = [];
  } else {
    setTimeout(() => {
      for (const card of cardPair) {
        unFlipCard(card);
      }
      flippedCards = [];
    }, FOUND_MATCH_WAIT_MSECS);
  }
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.classList.toggle('flipped');
  card.style.backgroundColor = 'white';
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  if (!evt.target.className.split(' ').includes('flipped')) {
    if (flippedCards.length < 2) {
      flipCard(evt.target);
    }
    updateCounts();
  }
}
