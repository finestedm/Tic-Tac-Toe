var grid = document.querySelector('container>grid')

const gameboard = (() => {
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            let grille = document.createElement('grille');
            grille.setAttribute('class', 'grille')
            grille.dataset.width = j;
            grille.dataset.height = i;
            grid.append(grille);
        }
    }


    const gril = document.querySelectorAll('.grille');
    Array.from(gril).forEach((square) => {
        square.addEventListener('click', () => {
            if ((square.classList.contains('taken')) == 0) {
                square.classList.add('taken');
            }
        });
    });
})();



