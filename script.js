const boardEl = document.getElementById('board');
const newBtn = document.getElementById('newBtn');
const undoBtn = document.getElementById('undoBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const playAgainBtn = document.getElementById('playAgainBtn');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreTEl = document.getElementById('scoreT');

let cells = Array(9).fill(null);
let current = 'X';
let isGameOver = false;
let history = [];
let scores = { X: 0, O: 0, T: 0 };

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function renderBoard() {
  boardEl.innerHTML = '';
  cells.forEach((val, i) => {
    const btn = document.createElement('button');
    btn.className = 'cell';
    if (val) {
      btn.textContent = val;
      btn.classList.add(val.toLowerCase());
    }
    btn.disabled = val || isGameOver;
    btn.addEventListener('click', () => play(i));
    boardEl.appendChild(btn);
  });
}

function play(i) {
  if (isGameOver || cells[i]) return;
  cells[i] = current;
  history.push(i);
  checkState();
  if (!isGameOver) current = current === 'X' ? 'O' : 'X';
  renderBoard();
}

function checkState() {
  const winnerLine = wins.find(([a,b,c]) => cells[a] && cells[a] === cells[b] && cells[b] === cells[c]);
  if (winnerLine) {
    const winner = cells[winnerLine[0]];
    isGameOver = true;
    scores[winner]++;
    showResult(`${winner} wins!`);
    return;
  }

  if (cells.every(Boolean)) {
    isGameOver = true;
    scores.T++;
    showResult("It's a draw!");
    return;
  }
}

function showResult(text) {
  updateScores();
  resultMessage.textContent = text;
  resultScreen.classList.remove('hidden');
}

function newGame() {
  cells = Array(9).fill(null);
  history = [];
  isGameOver = false;
  current = 'X';
  renderBoard();
}

function undo() {
  if (isGameOver || history.length === 0) return;
  const last = history.pop();
  cells[last] = null;
  current = current === 'X' ? 'O' : 'X';
  renderBoard();
}

function resetScore() {
  scores = { X: 0, O: 0, T: 0 };
  updateScores();
}

function updateScores() {
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreTEl.textContent = scores.T;
}

playAgainBtn.addEventListener('click', () => {
  resultScreen.classList.add('hidden');
  newGame();
});

newBtn.addEventListener('click', newGame);
undoBtn.addEventListener('click', undo);
resetScoreBtn.addEventListener('click', resetScore);

renderBoard();
updateScores();
