let winCount = { X: 0, O: 0 };
let drawCount = 0;

let startingPlayer = localStorage.getItem('startingPlayer') || 'X';
let currentPlayer = startingPlayer;

const currentTurnMessage = document.getElementById('currentTurnMessage');

currentTurnMessage.textContent = `${currentPlayer}'s turn!`;

const players = ['X', 'O'];

let gameOver = false;

function updateStats() {
    document.getElementById('winCountX').textContent = `Player X: ${winCount.X} Wins`;
    document.getElementById('winCountO').textContent = `Player O: ${winCount.O} Wins`;
    document.getElementById('drawCount').textContent = `Draws: ${drawCount}`;
}

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const squares = document.getElementsByClassName('square');

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if (gameOver) return;
        if (squares[i].textContent !== '') return;
        squares[i].textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            gameOver = true;
            currentTurnMessage.textContent = `Game over! ${currentPlayer} wins!`;
            winCount[currentPlayer]++;
            updateStats();
            return;
        }
        if (checkTie()) {
            gameOver = true;
            currentTurnMessage.textContent = `Game is tied!`;
            drawCount++;
            updateStats();
            return;
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        currentTurnMessage.textContent = `${currentPlayer}'s turn!`;
    });
}

function checkWin(currentPlayer) {
    for (let i = 0; i < winning_combinations.length; i++) {
        const [a, b, c] = winning_combinations[i];
        if (squares[a].textContent === currentPlayer &&
            squares[b].textContent === currentPlayer &&
            squares[c].textContent === currentPlayer) {
            highlightWinningSquares([a, b, c]);
            return true;
        }
    }
    return false;
}

function highlightWinningSquares(positions) {
    positions.forEach(pos => {
        squares[pos].style.backgroundColor = currentPlayer === 'X' ? '#D1E8FF' : '#FFDDC1';
        squares[pos].style.color = '#ffffff';
    });
}

function checkTie() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            return false;
        }
    }
    return true;
}

document.getElementById('newGameButton').addEventListener('click', () => {
    currentPlayer = (startingPlayer === 'X') ? 'O' : 'X';
    startingPlayer = currentPlayer;

    localStorage.setItem('startingPlayer', startingPlayer);

    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = '';
        squares[i].style.backgroundColor = '';
        squares[i].style.color = '';
    }

    gameOver = false;

    currentTurnMessage.textContent = `${currentPlayer}'s turn!`;
});

updateStats();