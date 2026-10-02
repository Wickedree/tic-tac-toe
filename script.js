const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", ""];

    const displayGameboard = () => {
        let boardHTML = "";

        gameboard.forEach((square, index) => {
            if (square === "") {
                boardHTML += `<div class="square" id="square-${index}"></div>`;
            } else {
                boardHTML += `<div class="square ${square.playerClass}" id="square-${index}">${square.mark}</div>`;
            }
        });

        document.querySelector("#gameboard").innerHTML = boardHTML;
    };

    const getBoard = () => {
        return gameboard;
    };

    const placeMark = (index, player) => {
        if (gameboard[index] === "") {
            gameboard[index] = {
                mark: player.mark,
                playerClass: player.playerClass
            };

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


const createPlayerFactory = (name, mark, playerClass) => {
    return {
        name,
        mark,
        playerClass
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
            createPlayerFactory(playerOneName, "X", "player-one"),
            createPlayerFactory(playerTwoName, "O", "player-two")
        ];

        currentPlayer = 0;
        gameOver = false;

        document.querySelector("#message").textContent = "";

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

        const moveMade = Gameboard.placeMark(index, player);

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
                board[a].mark === board[b].mark &&
                board[a].mark === board[c].mark
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

        if (board.every(square => square !== "")) {
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

        document.querySelector("#message").textContent = "";

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
