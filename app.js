let boxes = document.querySelectorAll('.box'); 
let resultContainer = document.getElementById('result');
let messageElement = document.getElementById('message');
let playAgainButton = document.getElementById('button');

let turnCount = 0;
let gameWon = false;
let winningPossibilities = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [7, 5, 3]
];
let xMoves = [];
let oMoves = [];

boxes.forEach((box, index) => {
  box.addEventListener('click', handleMove);
});

function handleMove(e) {
  let boxIndex = Number(e.target.id) - 1;
  let currentPlayer = (turnCount % 2 === 0) ? 'X' : 'O';
  let currentMoves = (currentPlayer === 'X') ? xMoves : oMoves;

  boxes[boxIndex].innerHTML = `<p style="color:#FAB201;">${currentPlayer}</p>`;
  currentMoves.push(boxIndex + 1);
  turnCount++;
  checkResult(currentMoves, currentPlayer);

  boxes[boxIndex].removeEventListener('click', handleMove);

  if (!gameWon && turnCount === 9) {
    resultContainer.style.visibility = 'visible';
    messageElement.innerText = 'The Match is Draw';
  }
}

function checkResult(movesArray, player) {
  for (let i = 0; i < 8; i++) {
    let count = 0;
    for (let j = 0; j < 3; j++) {
      if (movesArray.includes(winningPossibilities[i][j])) {
        count++;
      }
    }
    if (count === 3) {
      gameWon = true;
      resultContainer.style.visibility = 'visible';
      messageElement.innerText = `${player} Has Won the Match`;
    }
  }
}

playAgainButton.addEventListener('click', () => {
  window.location.href = './index.html';
});
