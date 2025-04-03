const resultShow = document.querySelector('.js-result');
const move = document.querySelector('.js-move');
const score = document.querySelector('.js-scrore-bord');
const resetButton = document.querySelector('.js-reset-button');
const finalScore = document.querySelector('.js-final-scrore');

const maxRound = 5;

// Load game state from localStorage
let gameData = JSON.parse(localStorage.getItem('gameData')) || {
  win: 0,
  lose: 0,
  tie: 0,
  playRound: 0
};

// Set the score and moves when the page loads
window.onload = function () {
  updateScore();
  
  if (gameData.playRound >= maxRound) {
    showGameOver();
  }
};

// Listen for keyboard inputs (r = rock, p = paper, s = scissors)
document.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(userMove) {
  if (gameData.playRound >= maxRound) {
    showGameOver();
    return;
  }

  const computerMove = pickComputerMove();
  let result = '';

  if (computerMove === userMove) {
    result = '😑 Tie 😑';
    gameData.tie++;
  } else if (
    (computerMove === 'rock' && userMove === 'paper') ||
    (computerMove === 'paper' && userMove === 'scissors') ||
    (computerMove === 'scissors' && userMove === 'rock')
  ) {
    result = '😃 Win 😃';
    gameData.win++;
  } else {
    result = '😔 Lose 😔';
    gameData.lose++;
  }

  resultShow.innerHTML = result;
  move.innerHTML = `Computer Move <img class="images-short" src="img/${computerMove}.jpg"> - 
                    <img class="images-short" src="img/${userMove}.jpg"> User Move`;

  gameData.playRound++;
  localStorage.setItem('gameData', JSON.stringify(gameData));

  updateScore();

  if (gameData.playRound >= maxRound) {
    showGameOver();
  }
}

function updateScore() {
  score.innerHTML = `Win: ${gameData.win} | Lose: ${gameData.lose} | Tie: ${gameData.tie}`;
}

function pickComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  return moves[Math.floor(Math.random() * moves.length)];
}

function resetGame() {
  gameData = { win: 0, lose: 0, tie: 0, playRound: 0 };
  localStorage.setItem('gameData', JSON.stringify(gameData));

  score.innerHTML = `Win: 0 | Lose: 0 | Tie: 0`;
  finalScore.innerHTML = `Win: 0 | Lose: 0 | Tie: 0`;

  document.querySelector('.main').style.display = 'block';
  document.querySelector('.game-over').style.display = 'none';
}

function showGameOver() {
  finalScore.innerHTML = `Win: ${gameData.win} | Lose: ${gameData.lose} | Tie: ${gameData.tie}`;
  document.querySelector('.main').style.display = 'none';
  document.querySelector('.game-over').style.display = 'block';
  document.querySelector('.game-over').style.visibility = 'visible';
}