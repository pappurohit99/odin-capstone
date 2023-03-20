/* eslint-disable space-before-function-paren */
/* GLOBAL CONSTANTS */
const VALID_MOVES = ['rock', 'paper', 'scissor'];

let PLAYER_SCORE = 0;
let COMPUTER_SCORE = 0;

function setupEvtInitializers() {
    // Button initializers
    const playBtn = document.querySelector('#PlayBtn');
    if (playBtn) {
        playBtn.addEventListener('click', (evt) => {
            const playerPosition = getComputedChoice();
            const computerPosition = getComputedChoice();
            const positions = {
                player: playerPosition,
                computer: computerPosition
            };
            computeScore(positions);
            renderResults(positions);
        });
    }

    const resetBtn = document.querySelector('#ResetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Reset constants
            PLAYER_SCORE = 0;
            COMPUTER_SCORE = 0;

            // Reset HTML
            renderResults();
        });
    }
}

function computeScore(positions) {
    const playerPosition = positions.player;
    const computerPosition = positions.computer;
    switch (playerPosition) {
        case 'rock': if (computerPosition === 'scissor') {
            PLAYER_SCORE += 1;
        } else if (computerPosition === 'paper') {
            COMPUTER_SCORE += 1;
        }
            break;
        case 'paper': if (computerPosition === 'rock') {
            PLAYER_SCORE += 1;
        } else if (computerPosition === 'scissor') {
            COMPUTER_SCORE += 1;
        }
            break;
        case 'scissor': if (computerPosition === 'paper') {
            PLAYER_SCORE += 1;
        } else if (computerPosition === 'rock') {
            COMPUTER_SCORE += 1;
        }
            break;
    }
}

function renderResults(positions) {
    // Update computer section
    const bGameReset = typeof positions === 'undefined';
    const computerMove = !bGameReset ? positions.computer : '-';
    const computerMoveHTML = document.querySelector('#computer-section>.move');
    if (computerMoveHTML) {
        computerMoveHTML.innerText = computerMove;
    }

    // Update player section
    const playerMove = !bGameReset ? positions.player : '-';
    const playerMoveHTML = document.querySelector('#player-section>.move');
    if (playerMoveHTML) {
        playerMoveHTML.innerText = playerMove;
    }

    // Update results
    const resultHTML = document.querySelector('body>h2');
    console.log(PLAYER_SCORE, COMPUTER_SCORE);
    if (resultHTML) {
        let resultStr = 'Result: ';
        if (bGameReset) {
            resultStr += 'NA';
        } else {
            const str = `Computer (${COMPUTER_SCORE}) - Player (${PLAYER_SCORE})`;
            resultStr += str;
        }
        resultHTML.innerText = resultStr;
    }
}

/**
 * Generate move
 * @returns {string} valid move
 */
function getComputedChoice() {
    const idx = Math.round(Math.random() * (VALID_MOVES.length - 1));
    return VALID_MOVES[idx];
}

setupEvtInitializers();
