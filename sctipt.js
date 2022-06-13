var grid = document.querySelector('container>grid');
var inputs = document.querySelectorAll('fieldset input');
var buttonInput = document.querySelectorAll(`fieldset input[type='radio']`)

const game = (() => {

    const Player = (name, symbol) => {  // using factory function to create players. 
        const listOfTakenSquaresByPlayer = []
        const addSquareToCurrentPlayer = (square) => {
            listOfTakenSquaresByPlayer.push(parseFloat(square))
        };
        const getListOfTakenSquaresByPlayer = () => (listOfTakenSquaresByPlayer);
        return { addSquareToCurrentPlayer, getListOfTakenSquaresByPlayer, name, symbol }
    }

    buttonInput.forEach((input) => {
        input.addEventListener('click', () => {
            playerOne.name = inputs[0].value;
            playerOne.symbol = input.value;
            (playerOne.symbol == 'X') ? playerTwo.symbol = 'O' : playerTwo.symbol = 'X';
            enableGame();           // enebled game only after symbol has bee chosen
        })
    });

    const enableGame = function () {        // enables buttons on grid 
        Array.from(gril).forEach((square) => {
            square.disabled = false;
            square.classList.add('enabled')
        })
    }

    const playerOne = Player('Default', "X"); // name & symbol should be selectable at the beginning of each game.
    const playerTwo = Player('Andrzej', "O"); // name & symbol should be selectable at the beginning of each game.
    let activePlayer = playerOne;


    // function Player(name, symbol) {   // same results but with object constructor 
    //     this.name = name;
    //     this.symbol = symbol;
    //     this.listOfTakenSquaresByPlayer = []
    // }

    // Player.prototype.addSquareToCurrentPlayer = function (square) {
    //     this.listOfTakenSquaresByPlayer.push(square)
    // };

    const gameboard = (() => {
        for (let i = 1; i <= 9; i++) {  // this creates an array of 3x3 with dataset of 1-9
            let grille = document.createElement('button');
            grille.setAttribute('class', 'grille')
            grille.disabled = true;
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
        [3, 5, 7]
    ];

    const checkIfWon = (activePlayer) => {
        console.log(activePlayer.getListOfTakenSquaresByPlayer());
        if (activePlayer.getListOfTakenSquaresByPlayer().length >= 3) {
            for (let i = 0; i < wins.length; i++) {

                if (wins[i].every(r => (activePlayer.getListOfTakenSquaresByPlayer()).includes(r))) {

                    console.log(`${activePlayer.name} wins`);
                }
            }
        }
    }


    const gril = document.querySelectorAll('.grille');
    Array.from(gril).forEach((square) => {
        square.addEventListener('click', () => {    // the array gets eventListener reacting to click and then chaning the class to 'taken' which disables it from further action. 
            if ((square.classList.contains('taken')) == 0) {
                square.classList.add('taken');
                square.classList.add(`${String(activePlayer.symbol)}`);
                activePlayer.addSquareToCurrentPlayer(square.dataset.location);                    //adds selected square to the array of selected squares of activeplayer
                checkIfWon(activePlayer);
                if (activePlayer == playerOne) {  //switches the player
                    activePlayer = playerTwo;
                } else {
                    activePlayer = playerOne;
                }

            }
        });
    });
})();







