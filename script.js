//We have player One and Player Two
//We have a board with 9 spaces
//Player One (X) Plays X on click
//Player Two (O) Plays X on click
//They take turns
//If XXX or OOO in any direction, the player wins
// If the board is full and nobody wins, it's a draw

/* ---- THE GAME NEEDS TO REMEMEBER: -----

What is currently in each of the 9 spaces?
Whose turn is it?
Has somebody won?
Is the game over? 

-------------------------------------------*/

//THIS IS AN IIFE to create a private variable
const Gameboard = (() => {
     let gameboard = ["", "", "", "", "", "", "", "", ""]

     const displayGameboard = () => {
        let boardHTML = "";
        gameboard.forEach((square,index) => {
            boardHTML += `<div class="square" id=square-${index}`>${square}</div>
        })
     }
     //USE DOM to add this to HTML

     return {
        displayGameboard,
     }
})();

const createPlayerFactory = (name, mark) => {
    return {
        name,
        mark
    }
}

const gameController = (() => {
    let players = [];
    let currentPlayer;
    let gameOver;

    const start = () => {
        players = [
            createPlayerFactory(document.querySelector().value, "X"), //ADD ID
            createPlayerFactory(document.querySelector().value, "O")  //ADD ID
        ]

        currentPlayer = 0;
        gameOver = false;
        Gameboard.displayGameboard();
    }
})();

const startButton = document.querySelector(); //ID
startButton.addEventListener("click", () => {
      gameController.start();
})