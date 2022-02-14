/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"] */
// Global variables
let bGameOver;
let player; let
  computer;
let roundCounter;

/** ************************************************************* */
// Helper Methods //
/** ************************************************************* */

/**
 * Returns a random enum
 * @returns {string} Computer's option
 */
function generateComputerResponse() {
  const options = ['Rock', 'Paper', 'Scissors'];
  const idx = Math.floor((Math.random() * 3));
  return options[idx];
}

/**
 * Returns the winner amongst player and computer
 * @param {string} option1
 * @param {string} option2
 * @returns {string} result
 */
function compareOptions(option1, option2) {
  switch (option1) {
    case 'rock':
      return option2 === 'paper' ? option2 : option1;
    case 'paper':
      return option2 === 'scissors' ? option2 : option1;
    case 'scissors':
      return option2 === 'rock' ? option2 : option1;
    default:
      return null;
  }
}

/**
 * Generates result string
 * @param {string} playerSelection
 * @param {string} computerSelection
 * @returns {string} response
 */
function generateResult(playerSelection, computerSelection) {
  const playerOption = playerSelection.toLowerCase();
  const computerOption = computerSelection.toLowerCase();

  if (playerOption === computerOption) {
    return 'It\'s a draw';
  }
  const result = compareOptions(playerOption, computerOption);
  if (result === playerOption) {
    return `You win! ${playerSelection} beats ${computerSelection}`;
  }
  return `You lose! ${computerSelection} beats ${playerSelection}`;
}

/**
 * Updates the score based on the results
 * @param {string} response
 */
function deduceWinner(response) {
  if (response.includes('win')) {
    player += 1;
  } else if (response.includes('lose')) {
    computer += 1;
  }
}

/**
 * Displays the result on the front end
 * @param {string} response
 */
function displayResult(response) {
  const parentNode = document.querySelector('.result-log-container');
  const text = document.createElement('h4');
  parentNode.appendChild(text);
  text.innerHTML = response;
}

/** ************************************************************* */
// Methods //
/** ************************************************************* */

function setupNextRound() {
  roundCounter += 1;
  let winningText = '';
  if (roundCounter === 5) {
    if (player > computer) {
      winningText = 'You won the tourney';
    } else if (player < computer) {
      winningText = 'You lost the tourney';
    } else {
      winningText = 'It\'s a tie';
    }
    const parentNode = document.querySelector('.result-log-container');
    const text = document.createElement('h4');
    parentNode.appendChild(text);
    text.innerHTML = winningText;
    text.style.fontWeight = 'bold';
    bGameOver = true;
  }
}

/**
 * @param {string} player
 * @param {string} computer
 */
function startRound(playerChoice, computerChoice) {
  const result = generateResult(playerChoice, computerChoice);
  deduceWinner(result);
  displayResult(result);
  setupNextRound();
}

/**
 * Setup callback for button click
 * @param {Event} evt
 */
function btnhandler(evt) {
  if (bGameOver) {
    // Do nothing until the roundCounter is reset
    return;
  }
  const selectedOption = evt.path[0].id;
  const computedOption = generateComputerResponse();
  startRound(selectedOption, computedOption);
}

/**
 * Initialize event handlers, global flags and counters
 */
function setupGame() {
  // Initialize event handlers
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((btn) => btn.addEventListener('click', btnhandler));
  bGameOver = false;
  player = 0;
  computer = 0;
  roundCounter = 0;
}

// Execution
setupGame();
