var grid = document.querySelector('container>grid')

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

    const listOfTakenSquaresByPlayerOne = [];
    const listOfTakenSquaresByPlayerTwo = [];

    const gril = document.querySelectorAll('.grille');
    Array.from(gril).forEach((square) => {
        square.addEventListener('click', () => {    // the array gets eventListener reacting to click and then chaning the class to 'taken' which disables it from further action. 
            if ((square.classList.contains('taken')) == 0) {
                square.classList.add('taken');
                if (game.activePlayer == game.playerOne) {
                    game.activePlayer = game.playerTwo;         //switches the player
                    square.classList.add('playerOne')
                    listOfTakenSquaresByPlayerOne.push(square); // adds the clicked gril to the array for corresponding to the player
                } else {
                    game.activePlayer = game.playerOne;
                    square.classList.add('playerTwo');
                    listOfTakenSquaresByPlayerTwo.push(square);
                }
            }
        });
    });
    return { listOfTakenSquaresByPlayerOne, listOfTakenSquaresByPlayerTwo }; // this is only for diagnostics ;))
})();

const game = (() => {
    const playerOne = { name: 'Paweł', symbol: "X" };
    const playerTwo = { name: 'Andrzej', symbol: "O" };
    let activePlayer = playerOne;


    return { playerOne, playerTwo, activePlayer }
})();





