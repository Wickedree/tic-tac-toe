const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", ""];

    const displayGameboard = () => {
        let boardHTML = "";

        gameboard.forEach((square, index) => {
            boardHTML += `
                <div class="square" id="square-${index}">
                    ${square}
                </div>
            `;
        });

        document.querySelector("#gameboard").innerHTML = boardHTML;
    };

    const getBoard = () => {
        return gameboard;
    };

    const placeMark = (index, mark) => {
        if (gameboard[index] === "") {
            gameboard[index] = mark;
            return true;
        }

        return false;
    };

    const reset = () => {
        gameboard = ["", "", "", "", "", "", "", "", ""];
    };

    return {
        displayGameboard,
        getBoard,
        placeMark,
        reset
    };
})();


const createPlayerFactory = (name, mark) => {
    return {
        name,
        mark
    };
};


const gameController = (() => {
    let players = [];
    let currentPlayer = 0;
    let gameOver = false;

    const start = () => {
        const playerOneName = document.querySelector("#playerOne").value.trim();
        const playerTwoName = document.querySelector("#playerTwo").value.trim();

        if (playerOneName === "" || playerTwoName === "") {
            document.querySelector("#message").textContent =
                "Please enter both player names.";

            return;
        }

        players = [
            createPlayerFactory(playerOneName, "X"),
            createPlayerFactory(playerTwoName, "O")
        ];

        currentPlayer = 0;
        gameOver = false;

        Gameboard.reset();
        Gameboard.displayGameboard();

        addSquareListeners();

        displayMessage();
    };


    const addSquareListeners = () => {
        const squares = document.querySelectorAll(".square");

        squares.forEach((square, index) => {
            square.addEventListener("click", () => {
                playRound(index);
            });
        });
    };


    const playRound = (index) => {
        if (gameOver) {
            return;
        }

        const player = players[currentPlayer];

        const moveMade = Gameboard.placeMark(index, player.mark);

        if (!moveMade) {
            return;
        }

        Gameboard.displayGameboard();

        checkGameOver();

        if (!gameOver) {
            currentPlayer = currentPlayer === 0 ? 1 : 0;

            addSquareListeners();

            displayMessage();
        }
    };


    const checkGameOver = () => {
        const board = Gameboard.getBoard();

        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;

            if (
                board[a] !== "" &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                gameOver = true;

                const winner = players[currentPlayer];

                document.querySelector("#message").textContent =
                    `${winner.name} wins!`;

                document.querySelector("#result-display").textContent =
                    `${winner.mark} wins!`;

                return;
            }
        }

        if (!board.includes("")) {
            gameOver = true;

            document.querySelector("#message").textContent =
                "It's a draw!";

            document.querySelector("#result-display").textContent =
                "Draw!";
        }
    };


    const displayMessage = () => {
        const player = players[currentPlayer];

        document.querySelector("#message").textContent =
            `${player.name}'s turn (${player.mark})`;
    };


    const restart = () => {
        Gameboard.reset();

        currentPlayer = 0;
        gameOver = false;

        document.querySelector("#result-display").textContent = "";

        if (players.length > 0) {
            Gameboard.displayGameboard();

            addSquareListeners();

            displayMessage();
        }
    };


    return {
        start,
        restart
    };
})();


const startButton = document.querySelector("#start-game-btn");
const restartButton = document.querySelector("#restart-game-btn");

startButton.addEventListener("click", () => {
    gameController.start();
});

restartButton.addEventListener("click", () => {
    gameController.restart();
});
