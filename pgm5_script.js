const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function createGameBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-cell-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute("data-cell-index"));

    if (gameState[cellIndex] !== "" || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin()) {
        endGame(false);
    } else if (isBoardFull()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
            gameState[a] === currentPlayer &&
            gameState[b] === currentPlayer &&
            gameState[c] === currentPlayer
        ) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    return gameState.every((cell) => cell !== "");
}

function endGame(draw) {
    if (draw) {
        status.textContent = "It's a draw!";
    } else {
        status.textContent = `Player ${currentPlayer} wins!`;
    }
    gameActive = false;
}

function resetGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    status.textContent = "Player X's turn";
    board.innerHTML = "";
    createGameBoard();
}

resetButton.addEventListener("click", resetGame);
createGameBoard();
