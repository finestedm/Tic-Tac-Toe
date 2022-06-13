var grid = document.querySelector('container>grid');
var inputs = document.querySelectorAll('fieldset input');
var buttonInput = document.querySelectorAll(`fieldset input[type='radio']`);
var winnerPanel = document.querySelector('.winner');

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
            (document.querySelector('fieldset')).remove();
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
                    console.log(winnerPanel)
                    winnerPanel.textContent = `${activePlayer.name} wins!`
                    winnerPanel.classList.add('visable')
                    startConfetti();
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

    var maxParticleCount = 100; //set max confetti count
    var particleSpeed = 1; //set the particle animation speed
    var startConfetti; //call to start confetti animation

    (function () {
        startConfetti = startConfettiInner;
        stopConfetti = stopConfettiInner;
        toggleConfetti = toggleConfettiInner;
        removeConfetti = removeConfettiInner;
        var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
        var streamingConfetti = false;
        var animationTimer = null;
        var particles = [];
        var waveAngle = 0;

        function resetParticle(particle, width, height) {
            particle.color = colors[(Math.random() * colors.length) | 0];
            particle.x = Math.random() * width;
            particle.y = Math.random() * height - height;
            particle.diameter = Math.random() * 10 + 5;
            particle.tilt = Math.random() * 10 - 10;
            particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
            particle.tiltAngle = 0;
            return particle;
        }

        function startConfettiInner() {
            var width = window.innerWidth;
            var height = window.innerHeight;
            window.requestAnimFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (callback) {
                        return window.setTimeout(callback, 16.6666667);
                    };
            })();
            var canvas = document.getElementById("confetti-canvas");
            if (canvas === null) {
                canvas = document.createElement("canvas");
                canvas.setAttribute("id", "confetti-canvas");
                canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none");
                document.body.appendChild(canvas);
                canvas.width = width;
                canvas.height = height;
                window.addEventListener("resize", function () {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }, true);
            }
            var context = canvas.getContext("2d");
            while (particles.length < maxParticleCount)
                particles.push(resetParticle({}, width, height));
            streamingConfetti = true;
            if (animationTimer === null) {
                (function runAnimation() {
                    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
                    if (particles.length === 0)
                        animationTimer = null;
                    else {
                        updateParticles();
                        drawParticles(context);
                        animationTimer = requestAnimFrame(runAnimation);
                    }
                })();
            }
        }

        function stopConfettiInner() {
            streamingConfetti = false;
        }

        function removeConfettiInner() {
            stopConfetti();
            particles = [];
        }

        function toggleConfettiInner() {
            if (streamingConfetti)
                stopConfettiInner();
            else
                startConfettiInner();
        }

        function drawParticles(context) {
            var particle;
            var x;
            for (var i = 0; i < particles.length; i++) {
                particle = particles[i];
                context.beginPath();
                context.lineWidth = particle.diameter;
                context.strokeStyle = particle.color;
                x = particle.x + particle.tilt;
                context.moveTo(x + particle.diameter / 2, particle.y);
                context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
                context.stroke();
            }
        }

        function updateParticles() {
            var width = window.innerWidth;
            var height = window.innerHeight;
            var particle;
            waveAngle += 0.01;
            for (var i = 0; i < particles.length; i++) {
                particle = particles[i];
                if (!streamingConfetti && particle.y < -15)
                    particle.y = height + 100;
                else {
                    particle.tiltAngle += particle.tiltAngleIncrement;
                    particle.x += Math.sin(waveAngle);
                    particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
                    particle.tilt = Math.sin(particle.tiltAngle) * 15;
                }
                if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
                    if (streamingConfetti && particles.length <= maxParticleCount)
                        resetParticle(particle, width, height);
                    else {
                        particles.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    })();


})();







