var grid = document.querySelector('container>grid')


const game = (() => {

    const Player = (name, symbol) => {  // using factory function to create players. 
        const playerName = name;
        const playerSymbol = symbol;
        const listOfTakenSquaresByPlayer = []
        const addSquareToCurrentPlayer = (square) => {
            listOfTakenSquaresByPlayer.push(square)
        };
        return { addSquareToCurrentPlayer, listOfTakenSquaresByPlayer }
    }



    const playerOne = Player('Default', "X"); // name & symbol should be selectable at the beginning of each game.
    const playerTwo = Player('Andrzej', "O"); // name & symbol should be selectable at the beginning of each game.;
    let activePlayer = playerOne;

    playerOne.name = window.prompt("Please enter your name", "PlayerOne");
    playerOne.symbol = window.prompt("Please enter your symbol", "X");

    // function Player(name, symbol) {   // same results but with object constructor 
    //     this.name = name;
    //     this.symbol = symbol;
    //     this.listOfTakenSquaresByPlayer = []
    // }

    // Player.prototype.addSquareToCurrentPlayer = function (square) {
    //     this.listOfTakenSquaresByPlayer.push(square)
    // };

    const wins = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]];

    const gameboard = (() => {
        for (let i = 1; i <= 9; i++) {  // this creates an array of 3x3 with dataset of 1-9
            let grille = document.createElement('grille');
            grille.setAttribute('class', 'grille')
            grille.dataset.location = i;
            grid.append(grille);
        }
    })();

    const wins = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]];

    const checkIfWon = () => {
        if (playerOne.listOfTakenSquaresByPlayer.length >= 2) {
            for (let i = 0; i < wins.length; i++) {
                if ((wins[i]).includes(playerOne.listOfTakenSquaresByPlayer)) {
                    console.log('test')
                }
            }
        }
    }


    const gril = document.querySelectorAll('.grille');
    Array.from(gril).forEach((square) => {
        square.addEventListener('click', () => {    // the array gets eventListener reacting to click and then chaning the class to 'taken' which disables it from further action. 
            if ((square.classList.contains('taken')) == 0) {
                square.classList.add('taken');
                if (activePlayer == playerOne) {
                    playerOne.addSquareToCurrentPlayer(square.dataset.location) //adds selected square to the array of selected squares of activeplayer
                    activePlayer = playerTwo;         //switches the player
                    square.classList.add('playerOne')

                } else {
                    playerTwo.addSquareToCurrentPlayer(square.dataset.locatio) //adds selected square to the array of selected squares of activeplayer
                    activePlayer = playerOne;
                    square.classList.add('playerTwo')
                }
                checkIfWon();
            }
        });
    });
})();







