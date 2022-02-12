/**
 * Returns a random enum
 * @returns {string} Computer's option
 */
const computerPlay = () => {
    const options = ['Rock', 'Paper', 'Scissors'];
    const idx = Math.floor((Math.random() * 3));
    return options[idx];
};

/**
 * Compares player's selection with computer's selection
 * @param {string} playerSelection 
 * @param {string} computerSelection 
 */
const gameplayRound = (playerSelection, computerSelection) => {
    const playerOption = playerSelection.toLowerCase();
    const computerOption = computerSelection.toLowerCase();
    const compareOptions = (option1, option2) => {
        switch (option1) {
            case 'rock':
                return option2 === 'paper' ? option2 : option1;
            case 'paper':
                return option2 === 'scissors' ? option2 : option1;
            case 'scissors':
                return option2 === 'rock' ? option2 : option1;
        }
    };
    if (playerOption === computerOption) {
        return `It's a draw`;
    }
    const result = compareOptions(playerOption, computerOption);
    if (result === playerOption) {
        return `You win! ${playerSelection} beats ${computerSelection}`;
    }
    return `You lose! ${computerSelection} beats ${playerSelection}`;
};
/**
 * Driver function
 */
const game = () => {
    let player = 0, computer = 0;
    for (let i = 0; i < 5; i++) {
        const playerResponse = prompt('Choose your move');
        const computerResponse = computerPlay();
        const response = gameplayRound(playerResponse, computerResponse);
        // Figure out winner from response string
        if (response.includes('win')) {
            player++;
        } else if (response.includes('lose')) {
            computer++;
        }
        console.log(response);
    }
    if (player > computer) {
        console.log(`You won the tourney`);
    } else if (player < computer) {
        console.log(`You lost the tourney`);
    } else {
        console.log(`It's a tie`);
    }
};

game();