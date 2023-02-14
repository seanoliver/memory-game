# Memory Game

A simple, browser-based memory game using HTML, CSS, and JavaScript.

## Overview

Players will be shown a collection of cards, face down, and can click on a card to reveal what’s underneath.

After clicking on two cards, the game should check to see whether they match. If they do, they will remain facing up.

If not, the cards should remain displayed to the player for one second, and then flip back down.

The goal of the game is to match up all the pairs.

## To Do

- [X] Clicking a card should change the background color to be the color of the class it has.
- [X] Users should only be able to change at most two cards at a time.
- [X] Clicking on two matching cards should be a “match” — those cards should stay face up.
- [X] When clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again. You should make sure to use a setTimeout so that you can execute code after one second.
- [X] Make sure this works only if you click on two different cards — clicking the same card twice shouldn’t count as a match!)
- [X] Make sure that you can not click too quickly and guess more than two cards at a time.
- [X] Add a button that when clicked will start the game.
- [ ] Add a button that when clicked will restart the game once it has ended.
- [ ] For every guess made, increment a score variable and display the score while the game is played.
- [ ] Store the lowest-scoring game in local storage, so that players can see a record of the best game played.
- [ ] Allow for any number of cards to appear, rather than always using the same deck.
- [ ] Instead of hard-coding colors, try something different like random colors or even images.