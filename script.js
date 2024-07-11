'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const switchPlayers = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const disableButtons = function (button) {
  button.disabled = true;
};

const enableButtons = function (button) {
  if ((button.disabled = true)) {
    button.disabled = false;
  }
};

let currentScore, totalScore, activePlayer, scores, winningScore;

const init = function () {
  currentScore = 0;
  totalScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  winningScore = 50;

  enableButtons(btnHold);
  enableButtons(btnNew);
  enableButtons(btnRoll);

  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const rollDice = function () {
  //Display the dice
  diceEl.classList.remove('hidden');

  //Generate a random number
  const dice = Math.trunc(Math.random() * 6) + 1;

  //Find a dice image
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore = currentScore + dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayers();
  }
};

//Hold score function
const holdScore = function () {
  scores[activePlayer] = scores[activePlayer] + currentScore;

  if (scores[activePlayer] >= winningScore) {
    document.querySelector(`#score--${activePlayer}`).textContent =
      winningScore;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    //document.getElementById(`name--${activePlayer}`).textContent = 'Winner!!';

    disableButtons(btnRoll);
    disableButtons(btnHold);
  } else {
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    switchPlayers();
  }
};

//New game function
const newGame = function () {
  init();
};

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', newGame);
