const selectedMenuOptions = document.querySelectorAll('.start-options button');
const selectedGameCells = document.querySelectorAll('.game-container button');
const endMessage = document.querySelector('footer p');

let newBoard = [];
let players;
let player1turn;

selectedMenuOptions.forEach((button) => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        endMessage.textContent = "";
        selectedGameCells.forEach((button) => {
            button.textContent = "";
        });

        let choice = button.textContent;

        if (!button.hasAttribute('disabled')) {
            selectedMenuOptions.forEach((btn) => {
                btn.setAttribute('disabled', 'disabled');
            });
        };

        players = newPlayers(choice);

        if (players.player1.marker === 'X') {
            player1turn = true;
        } else {
            player1turn = false;
        }

        selectedGameCells.forEach((btn) => {
            if (btn.hasAttribute('disabled')) {
                btn.removeAttribute('disabled');
            }
        });

        selectedGameCells.forEach((btn) => {
            btn.addEventListener('click', function(e) {
                if (btn.textContent === "") {
                    if (player1turn === true) {
                        btn.textContent = players.player1.marker;

                        let move = parseInt(btn.getAttribute('data-number'));
                        players.player1.moves.push(move);
                        newBoard.push(move);
                        player1turn = false;

                        let foundWinner = findWinner(players.player1.moves, newBoard);
                        let draw = checkIfDraw(selectedGameCells, foundWinner);

                        if (foundWinner !== false) {
                            printWinner(getPlayer(players, foundWinner), draw);
                            restartMenu();
                        } else if (draw) {
                            printWinner(null, draw);
                            restartMenu();
                        }
                    } else {
                        btn.textContent = players.player2.marker;

                        let move = parseInt(btn.getAttribute('data-number'));
                        players.player2.moves.push(move);
                        newBoard.push(move);
                        player1turn = true;

                        let isWinner = findWinner(players.player2.moves, newBoard);
                        let draw = checkIfDraw(selectedGameCells, isWinner);


                        if (isWinner !== false) {
                            printWinner(getPlayer(players, isWinner), draw);
                            restartMenu();
                        } else if (draw) {
                            printWinner(null, draw);
                            restartMenu();
                        }
                    }
                };
            });
        });
    });
});

function newPlayers(choice) {
    const markers = ['X' , 'O'];

    let player1 = {
        name: 'Player 1',
        marker: 'X',
        moves: [],
    };

    let player2 = {
        name: 'Player 2',
        marker: 'O',
        moves: [],
    };

    if (choice === 'O') {
            player1.marker = markers[1];
            player2.marker = markers[0];
    }

    return {
        player1,
        player2,
    }
}

function findWinner(playerMoves) {
    const winCons = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const winCon of winCons) {
        if (playerMoves.includes(winCon[0]) &&
            playerMoves.includes(winCon[1]) &&
            playerMoves.includes(winCon[2])) {
            return winCon;
        }
    }
    return false;
}

function checkIfDraw(selectedCells, foundWinner) {
    for (const cell of selectedCells) {
        if (cell.textContent === "") {
            return false;
        }
    }
    if (!foundWinner) {
        return true;
    }
    return false;
}

function printWinner(player, gameIsDraw) {
    if (gameIsDraw) {
        endMessage.textContent = `Game is a tie! Select X or O again to start a new game.`
    } else {
        endMessage.textContent = `${player.marker} wins (${player.name})! Select X or O again to start a new game.`
    }
}

function restartMenu() {
    selectedMenuOptions.forEach((button) => {
        button.removeAttribute('disabled');
    });
    selectedGameCells.forEach((button) => {
        button.setAttribute('disabled', true);
    });
}

function getPlayer(players, foundWinner) {
    if (foundWinner !== false) {
        if (players.player1.moves.includes(foundWinner[0])) {
            return players.player1;
        } else {
            return players.player2;
        }
    }
}