var grid = document.querySelector('container>grid')


const game = (() => {

    const Player = (name, symbol) => {  // using factory function to create players. 
        const playerName = name;
        const playerSymbol = symbol;
        const listOfTakenSquaresByPlayer = []
        const addSquareToCurrentPlayer = (square) => {
            listOfTakenSquaresByPlayer.push(square)
        };
        return { addSquareToCurrentPlayer }
    }



    // function Player(name, symbol) {   // same results but with object constructor 
    //     this.name = name;
    //     this.symbol = symbol;
    //     this.listOfTakenSquaresByPlayer = []
    // }

    // Player.prototype.addSquareToCurrentPlayer = function (square) {
    //     this.listOfTakenSquaresByPlayer.push(square)
    // };


    const playerOne = Player('Paweł', "X"); // name & symbol should be selectable at the beggining of each game.
    const playerTwo = Player('Andrzej', "O"); // name & symbol should be selectable at the beggining of each game.;
    let activePlayer = playerOne;

    const gameboard = (() => {
        for (let i = 1; i <= 3; i++) {  // this creates an array of 3x3 with dataset of 1-3 height and width coordinates
            for (let j = 1; j <= 3; j++) {
                let grille = document.createElement('grille');
                grille.setAttribute('class', 'grille')
                grille.dataset.width = j;
                grille.dataset.height = i;
                grid.append(grille);
            }
        }
    })();

    const gril = document.querySelectorAll('.grille');
    Array.from(gril).forEach((square) => {
        square.addEventListener('click', () => {    // the array gets eventListener reacting to click and then chaning the class to 'taken' which disables it from further action. 
            if ((square.classList.contains('taken')) == 0) {
                square.classList.add('taken');
                if (activePlayer == playerOne) {
                    playerOne.addSquareToCurrentPlayer(square) //adds selected square to the array of selected squares of activeplayer
                    activePlayer = playerTwo;         //switches the player
                    square.classList.add('playerOne')
                } else {
                    playerTwo.addSquareToCurrentPlayer(square) //adds selected square to the array of selected squares of activeplayer
                    activePlayer = playerOne;
                    square.classList.add('playerTwo')
                }
            }
        });
    });
})();







